// pkg/httpclient/client.go
package httpclient

import (
	"net/http"
	"net/http/cookiejar"
)

func NewClient() *http.Client {
	jar, _ := cookiejar.New(nil) // optionally handle error
	return &http.Client{Jar: jar}
}
