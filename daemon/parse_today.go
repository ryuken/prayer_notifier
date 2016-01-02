package main

import (
	"encoding/json"
	"encoding/xml"
	"io/ioutil"
	"log"
	"time"
)

func ParseToday() {

	type Date struct {
		Country string
		City    string
		Day     int    `xml:"day,attr"`
		Month   string `xml:"month,attr"`
		Year    int    `xml:"year,attr"`
		Fajr    string `xml:"fajr"`
		Sunrise string `xml:"sunrise"`
		Dhuhr   string `xml:"dhuhr"`
		Asr     string `xml:"asr"`
		Maghrib string `xml:"maghrib"`
		Isha    string `xml:"isha"`
	}

	type Result struct {
		XMLName xml.Name `xml:"prayer"`
		City    string   `xml:"city"`
		Country string   `xml:"country"`
		Date    []Date   `xml:"date"`
	}

	content, err := ioutil.ReadFile("the_hague.xml")

	if err != nil {
		log.Println(err)
		return
	}

	r := Result{}

	err = xml.Unmarshal(content, &r)

	if err != nil {
		log.Println(err)
		return
	}

	const layout = "1"    // Month
	const clock = "15:04" // Clock

	today := Date{}

	t := time.Now()

	for _, v := range r.Date {

		if v.Day == t.Day() && t.Format(layout) == v.Month && v.Year == t.Year() {

			today = v

			today.Country = r.Country
			today.City = r.City
			today.Fajr = ConvertTo24(v.Fajr, "AM")
			today.Sunrise = ConvertTo24(v.Sunrise, "AM")
			today.Dhuhr = ConvertTo24(v.Dhuhr, "PM")
			today.Asr = ConvertTo24(v.Asr, "PM")
			today.Maghrib = ConvertTo24(v.Maghrib, "PM")
			today.Isha = ConvertTo24(v.Isha, "PM")

			break
		}
	}

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
