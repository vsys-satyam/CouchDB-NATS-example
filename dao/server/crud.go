package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"blog-app/commons/models"
	c "dao/dbConn"
)

const (
	BaseURL  = "http://localhost:5984"
	DBName   = "blogs"
	Username = "admin"
	Password = "admin"
)

func dbURL() string {
	return fmt.Sprintf("%s/%s", BaseURL, DBName)
}

//	func http.NewRequest(method, url string, body io.Reader) (*http.Request, error) {
//		req, err := http.NewRequest(method, url, body)
//		if err != nil {
//			return nil, err
//		}
//		req.SetBasicAuth(Username, Password)
//		req.Header.Set("Content-Type", "application/json")
//		return req, nil
//	}

func CreatePost(post *models.BlogPost) (*models.BlogPost, error) {
	data, _ := json.Marshal(post)
	req, err := http.NewRequest("POST", dbURL(), bytes.NewReader(data))
	if err != nil {
		log.Print(err)
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	res, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	id, ok := result["id"].(string)
	if !ok {
		return nil, fmt.Errorf("unexpected CouchDB response: %+v", result)
	}
	rev, ok := result["rev"].(string)
	if !ok {
		return nil, fmt.Errorf("unexpected CouchDB response: %+v", result)
	}

	post.ID = id
	post.Rev = rev
	return post, nil
}

func GetPost(id string) (*models.BlogPost, error) {
	req, err := http.NewRequest("GET", dbURL()+"/"+id, nil)
	if err != nil {
		return nil, err
	}
	res, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode == 404 {
		return nil, fmt.Errorf("post not found")
	}

	var post models.BlogPost
	json.NewDecoder(res.Body).Decode(&post)
	return &post, nil
}

func UpdatePost(post *models.BlogPost) (*models.BlogPost, error) {
	data, _ := json.Marshal(post)
	req, err := http.NewRequest("PUT", dbURL()+"/"+post.ID, bytes.NewReader(data))
	if err != nil {
		return nil, err
	}
	res, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(res.Body).Decode(&result)

	post.Rev = result["rev"].(string)
	return post, nil
}

func DeletePost(id, rev string) error {
	req, err := http.NewRequest("DELETE", dbURL()+"/"+id+"?rev="+rev, nil)
	if err != nil {
		return err
	}
	res, err := c.Client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != 200 {
		return fmt.Errorf("failed to delete post")
	}
	return nil
}

// couchdb/client.go
func GetAllPosts() ([]models.BlogPost, error) {
	req, err := http.NewRequest("GET", dbURL()+"/_all_docs?include_docs=true", nil)
	if err != nil {
		return nil, err
	}

	res, err := c.Client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var result struct {
		Rows []struct {
			Doc models.BlogPost `json:"doc"`
		} `json:"rows"`
	}

	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	posts := make([]models.BlogPost, 0, len(result.Rows))
	for _, row := range result.Rows {
		posts = append(posts, row.Doc)
	}

	return posts, nil
}
