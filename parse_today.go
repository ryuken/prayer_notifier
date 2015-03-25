package main

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"os/exec"
	"regexp"
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
		currentTime := t.Format(clock)

		play := func(player, action, id string) {

			cmd := exec.Command("mpc", "playlist")
			var out bytes.Buffer
			cmd.Stdout = &out
			err := cmd.Run()
			if err != nil {
				fmt.Println(err)
			}

			reset := false
			var status []string

			fmt.Println(out.String())

			re := regexp.MustCompile("bleep.mp3")

			// check if current playlist has bleep.mp3
			if re.FindStringIndex(out.String()) == nil {

				reset = true
				fmt.Println("Current playlist is not azan.playlist")

				// get current playing status
				cmd = exec.Command("mpc", "status")
				cmd.Stdout = &out
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				// Print status
				re = regexp.MustCompile(`\[(\w+)\] #(\d+)/(\w+)\s+(\w+:\w+)/(\w+:\w+)`)
				//fmt.Printf("%q\n", re.FindStringSubmatch("[playing] #1/1 0:05/27:02"))
				status = re.FindStringSubmatch(fmt.Sprintf("%q\n", out.String()))
				fmt.Println(status)

				// remove temporary playlist
				cmd = exec.Command("mpc", "rm", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Removed temporary playlist")

				// save playlist as temporary playlist
				cmd = exec.Command("mpc", "save", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}

				fmt.Println("Saved current playlist to temp.playlist")

				// clear temporary playlist
				cmd = exec.Command("mpc", "clear")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Cleared playlist")

				// load azan playlist
				cmd = exec.Command("mpc", "load", "azan.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}

				fmt.Println("Loaded azan.playlist")
			}

			cmd = exec.Command(player, action, id)
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}

			fmt.Println("playing first from playlist and sleeping 3:21 mintues")

			time.Sleep(3*time.Minute + 21*time.Second)

			// stop playing
			cmd = exec.Command("mpc", "stop")
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println("Stopped playing azan")

			if reset == true {

				// clear temporary playlist
				cmd = exec.Command("mpc", "clear")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Cleared playlist")

				// load temp playlist
				cmd = exec.Command("mpc", "load", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Loaded temp.playlist again")

				// resume  playlist
				cmd = exec.Command("mpc", "play", status[2])
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Resumed original playlist")

				// seek to original position
				cmd = exec.Command("mpc", "seek", status[4])
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				fmt.Println("Seeked to original position")
			}
		}

		if currentTime == today.Fajr {
			fmt.Println("It's Fajr!")
			play("mpc", "play", "1")
		} else if currentTime == today.Sunrise {
			fmt.Println("It's Sunrise!")
			play("mpc", "play", "2")
		} else if currentTime == today.Dhuhr {
			fmt.Println("It's Dhuhr!")
			play("mpc", "play", "1")
		} else if currentTime == today.Asr {
			fmt.Println("It's Asr!")
			play("mpc", "play", "1")
		} else if currentTime == today.Maghrib {
			fmt.Println("It's Maghrib!")
			play("mpc", "play", "1")
		} else if currentTime == today.Isha {
			fmt.Println("It's Isha!")
			play("mpc", "play", "1")
		} else {
			fmt.Println(currentTime)
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
