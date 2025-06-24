package server

import (
	"encoding/json"
	"log"
	"net/http"

	"blog-app/commons/models"
)

// Create a new blog post
func CreatePostHandler(w http.ResponseWriter, r *http.Request) {
	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	created, err := CreatePost(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(created)
}

func GetPostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing ?id param", http.StatusBadRequest)
		return
	}
	post, err := GetPost(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(post)
}

func UpdatePostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing ?id param", http.StatusBadRequest)
		return
	}
	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	post.ID = id
	updated, err := UpdatePost(&post)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(updated)
}

func DeletePostHandler(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	rev := r.URL.Query().Get("rev")
	if id == "" || rev == "" {
		http.Error(w, "Missing ?id or ?rev param", http.StatusBadRequest)
		return
	}
	if err := DeletePost(id, rev); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func GetAllPostsHandler(w http.ResponseWriter, r *http.Request) {
	posts, err := GetAllPosts()
	if err != nil {
		http.Error(w, "Failed to get posts: "+err.Error(), http.StatusInternalServerError)
		return
	}
	log.Printf("-->>%+v", posts)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(posts)
}
