package natsconn

import (
	"log"

	"github.com/nats-io/nats.go"
)

const (
	natsURL = "nats://localhost:4222"
)

var Conn *nats.Conn

func Init() {
	var err error
	Conn, err = nats.Connect(natsURL)
	if err != nil {
		log.Fatalf("Error connecting to NATS: %v", err)
	}
	log.Printf("Go Backend connected to NATS at %s", natsURL)
}
