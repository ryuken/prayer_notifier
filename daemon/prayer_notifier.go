package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"regexp"
	"time"

	tools "th_tools"

	"github.com/robfig/cron"
	"github.com/rs/cors"
)

func main() {

	logFile, err := os.OpenFile("server.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		panic(err)
	}

	defer logFile.Close()

	log.SetOutput(logFile)

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

	today := Date{}

	loadToday := func() {

		content, err := ioutil.ReadFile("today.json")

		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(content, &today)

		if err != nil {
			log.Fatal(err)
		}
	}

	const clock = "15:04" // Clock

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

			var status []string

			//fmt.Println(out.String())
			//fmt.Println("Current playlist is not azan.playlist")

			// get current playing status
			cmd = exec.Command("mpc", "status")
			cmd.Stdout = &out
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
			// Print status
			re := regexp.MustCompile(`\[(\w+)\] #(\d+)/(\w+)\s+(\w+:\w+)/(\w+:\w+)`)
			//fmt.Printf("%q\n", re.FindStringSubmatch("[playing] #1/1 0:05/27:02"))
			status = re.FindStringSubmatch(fmt.Sprintf("%q\n", out.String()))
			//fmt.Println(status)

			if len(status) > 0 {
				// remove temporary playlist
				cmd = exec.Command("mpc", "rm", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				//fmt.Println("Removed temporary playlist")

				// save playlist as temporary playlist
				cmd = exec.Command("mpc", "save", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}

				//fmt.Println("Saved current playlist to temp.playlist")

				// clear current playlist
				cmd = exec.Command("mpc", "clear")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				//fmt.Println("Cleared playlist")
			}

			// load azan playlist
			cmd = exec.Command("mpc", "load", "azan.playlist")
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}

			//fmt.Println("Loaded azan.playlist")

			cmd = exec.Command(player, action, id)
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}

			//fmt.Println("playing first from playlist and sleeping 3:21 mintues")

			time.Sleep(3*time.Minute + 21*time.Second)

			// stop playing
			cmd = exec.Command("mpc", "stop")
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
			//fmt.Println("Stopped playing azan")

			// clear temporary playlist
			cmd = exec.Command("mpc", "clear")
			err = cmd.Run()
			if err != nil {
				fmt.Println(err)
			}
			//fmt.Println("Cleared playlist")

			if len(status) > 0 {
				// load temp playlist
				cmd = exec.Command("mpc", "load", "temp.playlist")
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				//fmt.Println("Loaded temp.playlist again")

				// resume  playlist
				cmd = exec.Command("mpc", "play", status[2])
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				//fmt.Println("Resumed original playlist")

				// seek to original position
				cmd = exec.Command("mpc", "seek", status[4])
				err = cmd.Run()
				if err != nil {
					fmt.Println(err)
				}
				//fmt.Println("Seeked to original position")
			}
		}

		if currentTime == today.Fajr {
			fmt.Println("It's Fajr!")
			// DISABLE TEMP play("mpc", "play", "1")
		} else if currentTime == today.Sunrise {
			fmt.Println("It's Sunrise!")
			play("mpc", "play", "2")
		} else if currentTime == today.Dhuhr {
			fmt.Println("It's Dhuhr!")
			play("mpc", "play", "1")
		} else if currentTime == today.Asr {
			fmt.Println("It's Asr!")
			// DISABLE TEMP play("mpc", "play", "1")
		} else if currentTime == today.Maghrib {
			fmt.Println("It's Maghrib!")
			play("mpc", "play", "1")
		} else if currentTime == today.Isha {
			fmt.Println("It's Isha!")
			play("mpc", "play", "1")
		} else {
			//fmt.Println(currentTime, "nothing to do...")
		}
	}

	fmt.Println("started at", time.Now())

	Download()
	ParseToday()
	loadToday()

	fmt.Println(today)

	daemon := cron.New()
	daemon.AddFunc("@daily", Download) // @monthly
	daemon.AddFunc("@daily", ParseToday)
	daemon.AddFunc("@every 12h", loadToday)
	daemon.AddFunc("@every 1m", check)
	daemon.Start()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"GET", "POST"},
	})

	ht := tools.HttpTool{}
	ht.Init()

	ht.Get("/today", c.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "today.json")
	})))

	ht.Get("/qm", c.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("xDGJGDx"))
	})))

	ht.Route(logFile, "3000")
}
