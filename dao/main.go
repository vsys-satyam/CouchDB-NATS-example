package main

import (
	"dao/dbConn"
	"dao/server"
)

func main() {

	dbConn.InitDB()
	server.Web()
}
