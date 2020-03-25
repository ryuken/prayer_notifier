package main

import (
	"net/http"
	"os/exec"
)

func brightness(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	cmd := exec.Command("/bin/sh", "/home/pi/prayer_notifier/scripts/brightness.sh", r.URL.Query().Get("amount"))
	err := cmd.Start()

	return "json", err == nil, err
}

func fullscreen(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	cmd := exec.Command("/bin/sh", `/home/pi/prayer_notifier/scripts/fullscreen.sh`)
	err := cmd.Start()

	return "json", err == nil, err
}