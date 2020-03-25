package main

import (
	"net/http"
	"time"
)

func todayRead(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "today.json")
}

func nextPrayer(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	t := time.Now()
	currentTime := t.Format(clock)

	result := make(map[string]string)

	if currentTime < Today.Fajr || currentTime > Today.Isha {
		result["prayer"] = "Fajr"
	} else if currentTime < Today.Sunrise {
		result["prayer"] = "Sunrise"
	} else if currentTime < Today.Dhuhr {
		result["prayer"] = "Dhuhr"
	} else if currentTime < Today.Asr {
		result["prayer"] = "Asr"
	} else if currentTime < Today.Maghrib {
		result["prayer"] = "Maghrib"
	} else if currentTime < Today.Isha {
		result["prayer"] = "Isha"
	} else if currentTime < Today.Midnight {
		result["prayer"] = "Midnight"
	}

	return "json", result, nil
}