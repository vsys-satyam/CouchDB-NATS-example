package server

import (
	"log"
	"log/slog"
	"net/http"

	natsconn "web/nats"

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

		// Optional reply
		if m.Reply != "" {
			_ = natsconn.Conn.Publish(m.Reply, []byte(m.Data))
		}
	})
	if err != nil {
		log.Fatalf(" Error subscribing to '%s': %v", browserMsgSubject, err)
	}
	log.Printf("Subscribed to NATS subject: %s", browserMsgSubject)
}


