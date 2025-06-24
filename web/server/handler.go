package server

import (
	"net/http"
	page "web/pages"
)

func AllBlog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	pageData := page.BlogPost{}
	w.Write([]byte(pageData.Build()))
}
