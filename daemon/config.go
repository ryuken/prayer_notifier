package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func configRead(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "config.json")
}

func configUpdate(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	decoder := json.NewDecoder(r.Body)

	type Post struct {
		City 	string
		Enabled []string
	}

	var post Post

	err := decoder.Decode(&post)
	if err != nil {
		return "json", nil, err
	}

	js, err := json.Marshal(post)
	if err != nil {
		return "json", nil, err
	}

	err = ioutil.WriteFile("config.json", js, 0644)
	if err != nil {
		return "json", nil, err
	}

	return "json", post, err
}
