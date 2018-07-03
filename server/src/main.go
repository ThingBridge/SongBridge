package main

import (
	"log"
	"net/http"
)

func handleLinkRequest(responseWriter http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()

	id := query.Get("id")
	source := query.Get("source")
	kind := query.Get("kind")

	if id == "" {
		responseWriter.WriteHeader(http.StatusBadRequest)
		responseWriter.Write([]byte("Missing query parameter 'id'"))
		return
	}

	if source == "" {
		responseWriter.WriteHeader(http.StatusBadRequest)
		responseWriter.Write([]byte("Missing query parameter 'source'"))
		return
	}

	if kind == "" {
		responseWriter.WriteHeader(http.StatusBadRequest)
		responseWriter.Write([]byte("Missing query parameter 'kind'"))
		return
	}

	var response = id + " " + source + " " + kind
	responseWriter.Write([]byte(response))
}

func main() {
	http.HandleFunc("/link", handleLinkRequest)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
