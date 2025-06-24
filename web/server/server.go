package server

import (
	"bytes"
	"encoding/json"
	"log"
	"log/slog"
	"net/http"

	natsconn "web/nats"

	"blog-app/commons/models"
	page "web/pages"

	"github.com/gorilla/mux"
	"github.com/nats-io/nats.go"
)

const (
	port              = "8081"
	browserMsgSubject = "browser.msg"
)

func Web() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the Blog API"))
	}).Methods("GET")

	r.HandleFunc("/blogs", AllBlog).Methods("GET")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	// Init NATS and start subscriber
	natsconn.Init()          // connect to NATS
	subscribeToBrowserMsgs() // start NATS subscriber

	slog.Info("Server listening", "port", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf(" Failed to start server: %v", err)
	}
}

func subscribeToBrowserMsgs() {
	_, err := natsconn.Conn.Subscribe(browserMsgSubject, func(m *nats.Msg) {
		log.Printf(" Received from browser: %s", string(m.Data))

		var post models.BlogPost
		if err := json.Unmarshal(m.Data, &post); err != nil {
			log.Printf(" Failed to decode JSON: %v", err)
			return
		}

		log.Printf("Decoded BlogPost - Title: %s, Author: %s, Content: %s", post.Title, post.Author, post.Content)

		// Send HTTP POST request to REST API
		jsonData, err := json.Marshal(post)
		if err != nil {
			log.Printf(" Error marshalling post: %v", err)
			return
		}

		resp, err := http.Post("http://0.0.0.0:8080/posts", "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf(" Failed to POST to REST API: %v", err)
			return
		}
		defer resp.Body.Close()

		log.Printf("POST request sent, status: %s", resp.Status)
		if err := json.NewDecoder(resp.Body).Decode(&post); err != nil {
			log.Print(err)
		}
		// Optional reply to browser
		if m.Reply != "" {
			strig := (*page.BlogPost)(&post).BuildBlogsDiv()
			_ = natsconn.Conn.Publish(m.Reply, []byte(strig))
		}
	})
	if err != nil {
		log.Fatalf(" Error subscribing to '%s': %v", browserMsgSubject, err)
	}
	log.Printf("Subscribed to NATS subject: %s", browserMsgSubject)
}
