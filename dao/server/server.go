package server

import (
	"log"
	"log/slog"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	port = "8080"
)

func Web() {

	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to the Blog API"))
	}).Methods("GET")

	r.HandleFunc("/posts", CreatePostHandler).Methods("POST")
	r.HandleFunc("/posts", GetPostHandler).Methods("GET")
	r.HandleFunc("/posts", UpdatePostHandler).Methods("PUT")
	r.HandleFunc("/posts", DeletePostHandler).Methods("DELETE")
	r.HandleFunc("/posts/all", GetAllPostsHandler).Methods("GET")

	slog.Info("Server listening on port: " + port)
	err := http.ListenAndServe(":"+port, r)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

}
