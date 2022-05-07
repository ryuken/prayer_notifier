package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"
)

func configRead(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	type Data struct {
		Id      string
		City    string
		MPD     bool
		Enabled []string
	}

	var data Data

	content, err := ioutil.ReadFile("config.json")

	err = json.Unmarshal(content, &data)

	if err != nil {
		return "json", nil, err
	}

	return "json", data, err
}

func configUpdate(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	type Post struct {
		Id      string
		City    string
		MPD     bool
		Enabled []string
	}

	var post Post

	r.ParseForm()

	post.Id = r.URL.Query().Get("Id")
	post.City = r.URL.Query().Get("City")
	post.Enabled = r.Form["Enabled"]

	mpd, err := strconv.ParseBool(r.URL.Query().Get("MPD"))
	post.MPD = mpd

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
