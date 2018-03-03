package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"
)

func ParseToday() {

	content, err := ioutil.ReadFile("city.json")

	if err != nil {
		log.Println(err)
		return
	}

	items := []Item{}

	err = json.Unmarshal(content, &items)

	if err != nil {
		log.Println(err)
		return
	}

	today := Item{}

	now := time.Now()

	for _, v := range items {

		if v.Date == now.Format("02-01-2006") {

			today = v

			break
		}
	}

	log.Println(today)

	output, err := json.MarshalIndent(today, "", "\t")
	if err != nil {
		log.Println(err)
		return
	}

	err = ioutil.WriteFile("today.json", output, 0665)

	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Finished parsing today")
}
