package models

type BlogPost struct {
	ID      string `json:"_id,omitempty"`
	Rev     string `json:"_rev,omitempty"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"author"`
}
