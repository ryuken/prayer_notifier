package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"os/exec"
	"time"
)

func main() {

	type Date struct {
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
		log.Fatal(err)
	}

	r := Result{}

	err = xml.Unmarshal(content, &r)

	if err != nil {
		log.Fatal(err)
	}

	const layout = "01"   // Month
	const clock = "15:04" // Clock

	today := Date{}

	checkDate := func() {

		t := time.Now()

		for _, v := range r.Date {
			if v.Day == t.Day() && t.Format(layout) == v.Month && v.Year == t.Year() {

				today = v

				today.Fajr = ConvertTo24(v.Fajr, "AM")
				today.Sunrise = ConvertTo24(v.Sunrise, "AM")
				today.Dhuhr = ConvertTo24(v.Dhuhr, "PM")
				today.Asr = ConvertTo24(v.Asr, "PM")
				today.Maghrib = ConvertTo24(v.Maghrib, "PM")
				today.Isha = ConvertTo24(v.Isha, "PM")

				break
			}
		}

		fmt.Println("Checked date")
	}

	schedule(checkDate, 5*time.Minute)

	check := func() {

		t := time.Now()

		d, _ := time.ParseDuration("1h")

		t = t.Add(d)

		currentTime := t.Format(clock)

		play := func(player, file string) {
			cmd := exec.Command(player, file)
			err := cmd.Start()
			if err != nil {
				fmt.Println(err)
			}
		}

		if currentTime == today.Fajr {
			fmt.Println("It's Fajr!")
			play("aplay", "./azan12.wav")
		} else if currentTime == today.Sunrise {
			fmt.Println("It's Sunrise!")
			play("aplay", "./bleep_01.wav")
		} else if currentTime == today.Dhuhr {
			fmt.Println("It's Dhuhr!")
			play("aplay", "./azan12.wav")
		} else if currentTime == today.Asr {
			fmt.Println("It's Asr!")
			play("aplay", "./azan12.wav")
		} else if currentTime == today.Maghrib {
			fmt.Println("It's Maghrib!")
			play("aplay", "./azan12.wav")
		} else if currentTime == today.Isha {
			fmt.Println("It's Isha!")
			play("aplay", "./azan12.wav")
		} else {
			fmt.Println(currentTime)
			//play("aplay", "./bleep_01.wav")
		}

		fmt.Println(today)
	}

	stopCheck := schedule(check, 1*time.Minute)

	time.Sleep(24 * time.Hour * 30)

	stopCheck <- true
}

func schedule(what func(), delay time.Duration) chan bool {
	stop := make(chan bool)

	go func() {
		for {
			what()
			select {
			case <-time.After(delay):
			case <-stop:
				return
			}
		}
	}()

	return stop
}
