package dbConn

import (
	httpclient "blog-app/commons"
	"bytes"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

const (
	dbURL  = "http://localhost:5984"
	dbNAME = "blogs"
	admin  = "admin"
	pass   = "admin"
)

var Client = httpclient.NewClient()

func InitDB() {
	if err := login(); err != nil {
		panic("Login failed: " + err.Error())
	}
	createDB()
	ensureUsersDB()
}

func login() error {
	form := url.Values{}
	form.Set("name", admin)
	form.Set("password", pass)

	req, err := http.NewRequest("POST", dbURL+"/_session", bytes.NewBufferString(form.Encode()))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	res, err := Client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(res.Body)
		return fmt.Errorf("Login failed: %s", string(body))
	}

	fmt.Println("✅ Cookie login successful for DB init.")
	return nil
}

func createDB() {
	req, err := http.NewRequest("PUT", fmt.Sprintf("%s/%s", dbURL, dbNAME), nil)
	if err != nil {
		panic(err)
	}
	res, err := Client.Do(req) // ✅ Use cookie client
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	if res.StatusCode == 201 || res.StatusCode == 412 {
		fmt.Println("✅ Database ready:", dbNAME)
	} else {
		fmt.Printf("❌ Failed to create database: %s\n", res.Status)
		os.Exit(1)
	}
}

func ensureUsersDB() {
	req, err := http.NewRequest("PUT", fmt.Sprintf("%s/%s", dbURL, "_users"), nil)
	if err != nil {
		panic(err)
	}
	res, err := Client.Do(req) // ✅ Use cookie client
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	if res.StatusCode == 201 || res.StatusCode == 412 {
		fmt.Println("✅ _users database is ready.")
	} else {
		fmt.Printf("❌ Failed to create _users database: %s\n", res.Status)
		os.Exit(1)
	}
}
