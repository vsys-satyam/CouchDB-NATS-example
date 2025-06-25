package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"strings"

	natsconn "web/nats"

	"blog-app/commons/models"
	page "web/pages"

	"github.com/gorilla/mux"
	"github.com/nats-io/nats.go"
)

const (
	port              = "8081"
	browserMsgSubject = "blog.msg."
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
	_, err := natsconn.Conn.Subscribe(browserMsgSubject+">", func(m *nats.Msg) {
		subjectSuffix := strings.TrimPrefix(m.Subject, browserMsgSubject)
		subjectSuffix = strings.TrimPrefix(subjectSuffix, ".")
		switch subjectSuffix {
		case "create":
			var post models.BlogPost
			if err := json.Unmarshal(m.Data, &post); err != nil {
				log.Printf("Failed to decode JSON: %v", err)
				return
			}
			// Send HTTP POST request to REST API
			jsonData, err := json.Marshal(post)
			if err != nil {
				log.Printf("Error marshalling post: %v", err)
				return
			}
			resp, err := http.Post("http://0.0.0.0:8080/posts", "application/json", bytes.NewBuffer(jsonData))
			if err != nil {
				log.Printf("Failed to POST to REST API: %v", err)
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
		case "delete":
			id := string(m.Data)

			var post models.BlogPost

			// Step 1: Fetch post by ID to get its current rev
			getResp, err := http.Get("http://0.0.0.0:8080/posts?id=" + id)
			if err != nil {
				log.Printf("Failed to fetch post before delete: %v", err)
				return
			}
			defer getResp.Body.Close()

			if getResp.StatusCode != http.StatusOK {
				log.Printf("Failed to fetch post: status %s", getResp.Status)
				return
			}

			if err := json.NewDecoder(getResp.Body).Decode(&post); err != nil {
				log.Printf("Failed to decode GET response: %v", err)
				return
			}

			deleteURL := fmt.Sprintf("http://0.0.0.0:8080/posts?id=%s&rev=%s", post.ID, post.Rev)
			req, err := http.NewRequest(http.MethodDelete, deleteURL, nil)
			if err != nil {
				log.Printf("Failed to create delete request: %v", err)
				return
			}

			delResp, err := http.DefaultClient.Do(req)
			if err != nil {
				log.Printf("Failed to send delete request: %v", err)
				return
			}
			defer delResp.Body.Close()
			log.Printf("delete request sent for ID %s, status: %s", id, delResp.Status)
			if m.Reply != "" {
				_ = natsconn.Conn.Publish(m.Reply, []byte("Deleted: "+id))
			}
		case "editdialog":
			id := string(m.Data)

			var post models.BlogPost

			// Step 1: Fetch post by ID to get its current rev
			getResp, err := http.Get("http://0.0.0.0:8080/posts?id=" + id)
			if err != nil {
				log.Printf("Failed to fetch post before delete: %v", err)
				return
			}
			defer getResp.Body.Close()

			if getResp.StatusCode != http.StatusOK {
				log.Printf("Failed to fetch post: status %s", getResp.Status)
				return
			}

			if err := json.NewDecoder(getResp.Body).Decode(&post); err != nil {
				log.Printf("Failed to decode GET response: %v", err)
				return
			}
			editdialog := (*page.BlogPost)(&post).BuildEditDialog()
			_ = natsconn.Conn.Publish(m.Reply, []byte(editdialog))
		case "update":
			var post models.BlogPost
			if err := json.Unmarshal(m.Data, &post); err != nil {
				log.Printf("Failed to decode JSON: %v", err)
				return
			}

			jsonData, err := json.Marshal(post)
			if err != nil {
				log.Printf("Error marshalling post: %v", err)
				return
			}
			req, err := http.NewRequest(http.MethodPut, "http://0.0.0.0:8080/posts", bytes.NewBuffer(jsonData))
			if err != nil {
				log.Printf("Failed to POST to REST API: %v", err)
				return
			}
			updateResp, _ := http.DefaultClient.Do(req)
			if err := json.NewDecoder(updateResp.Body).Decode(&post); err != nil {
				log.Print(err)
			}
			defer updateResp.Body.Close()
			// Optional reply to browser
			if m.Reply != "" {
				var posts []models.BlogPost
				req, err := http.NewRequest(http.MethodGet, "http://0.0.0.0:8080/posts/all", nil)
				if err != nil {
					log.Printf("Failed to POST to REST API: %v", err)
					return
				}
				updateResp, _ := http.DefaultClient.Do(req)
				if err := json.NewDecoder(updateResp.Body).Decode(&posts); err != nil {
					log.Print(err)
				}
				var html strings.Builder
				for i := range posts {
					editdialog := (*page.BlogPost)(&posts[i]).BuildBlogsDiv()
					html.WriteString(editdialog)
				}
				_ = natsconn.Conn.Publish(m.Reply, []byte(html.String()))
			}
		default:
			log.Printf("Ignoring unknown subtopic '%s'", subjectSuffix)
		}
	})

	if err != nil {
		log.Fatalf("Error subscribing to '%s': %v", browserMsgSubject+">", err)
	}
	log.Printf("Subscribed to NATS subject: %s>", browserMsgSubject)
}
