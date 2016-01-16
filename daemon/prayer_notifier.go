package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"gopkg.in/fsnotify.v1"

	tools "th_tools"

	"github.com/robfig/cron"
	"github.com/rs/cors"
	"github.com/spf13/viper"
)

type Config struct {
	Enabled []string
}

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

var Today Date

func main() {
	/*
		logFile, err := os.OpenFile("server.log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)

		if err != nil {
			panic(err)
		}

		defer logFile.Close()

		log.SetOutput(logFile)
	*/
	loadToday := func() {

		content, err := ioutil.ReadFile("today.json")

		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(content, &Today)

		if err != nil {
			log.Fatal(err)
		}
	}

	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	viper.SetConfigType("json")

	err := viper.ReadInConfig() // Find and read the config file
	if err != nil {             // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}

	viper.WatchConfig()

	viper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)
	})

	const clock = "15:04" // Clock

	fmt.Println("started at", time.Now())

	Download()
	ParseToday()
	loadToday()

	fmt.Println(Today)

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

	ht.Get("/config", c.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "config.json")
	})))

	ht.Post("/config/update", c.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		decoder := json.NewDecoder(r.Body)

		type Post struct {
			Enabled []string
		}

		var post Post

		err := decoder.Decode(&post)
		if err != nil {
			log.Println(err)
		}

		js, err := json.Marshal(post)
		if err != nil {
			log.Println(err)
		}

		err = ioutil.WriteFile("config.json", js, 0644)
		if err != nil {
			log.Println(err)
		}

		w.Write(js)
	})))

	ht.Get("/qm", c.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("xDGJGDx"))
	})))

	ht.Route(nil, "3000")
}
