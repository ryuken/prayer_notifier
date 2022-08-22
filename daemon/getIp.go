package main

import (
	"log"
	"net"
	"strings"
)

func getIp() string {
	ief, err := net.InterfaceByName("wlan0")
	if err != nil {
		log.Fatal(err)
	}
	addrs, err := ief.Addrs()
	if err != nil {
		log.Fatal(err)
	}

	return strings.Split(addrs[0].String(), "/")[0]
}
