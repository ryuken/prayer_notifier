package main

import (
	"log"

	probing "github.com/prometheus-community/pro-bing"
)

func checkInternetConnection() {

	log.Println("Checking internet connectivity")
	pinger, _ := probing.NewPinger("www.google.com")

	pinger.Count = 3

	pinger.Run() // Blocks until finished.

	stats := pinger.Statistics()
	if stats.PacketsRecv != 3 {
		play("bleep.mp3")
	}
}
