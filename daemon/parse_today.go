package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"
)

func ParseToday() {

	type Item struct {
		Date    string `json:"date_for"`
		Fajr    string
		Sunrise string `json:"shurooq"`
		Dhuhr   string
		Asr     string
		Maghrib string
		Isha    string
	}

	type Monthly struct {
		Country string
		City    string
		Items   []Item
	}

	content, err := ioutil.ReadFile("the_hague.json")

	if err != nil {
		log.Println(err)
		return
	}

	month := Monthly{}

	err = json.Unmarshal(content, &month)

	if err != nil {
		log.Println(err)
		return
	}

	const layout = "2006-1-2" // Month

	today := Date{}

	now := time.Now()

	for _, v := range month.Items {

		if v.Date == now.Format(layout) {

			today.Date = v.Date
			today.Fajr = ConvertTo24(v.Fajr)
			today.Sunrise = ConvertTo24(v.Sunrise)
			today.Dhuhr = ConvertTo24(v.Dhuhr)
			today.Asr = ConvertTo24(v.Asr)
			today.Maghrib = ConvertTo24(v.Maghrib)
			today.Isha = ConvertTo24(v.Isha)

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
