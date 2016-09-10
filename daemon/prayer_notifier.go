package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	tools "bitbucket.org/taushif/th_tools"

	"github.com/fsnotify/fsnotify"
	"github.com/justinas/alice"
	"github.com/robfig/cron"
	"github.com/rs/cors"
	"github.com/spf13/viper"
)

type Config struct {
	Enabled []string
}

type Date struct {
	Date    string
	Fajr    string
	Sunrise string
	Dhuhr   string
	Asr     string
	Maghrib string
	Isha    string
}

var Today Date

func main() {

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

	ht.Get("/today", alice.New(c.Handler).Then(http.HandlerFunc(todayRead)))
	ht.Get("/nextPrayer", alice.New(c.Handler).Then(tools.AppHandler(nextPrayer)))

	ht.Get("/config", alice.New(c.Handler).Then(http.HandlerFunc(configRead)))
	ht.Post("/config/update", alice.New(c.Handler).Then(tools.AppHandler(configUpdate)))

	ht.Get("/qm", alice.New(c.Handler).Then(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("xDGJGDx"))
	})))

	ht.Route(nil, "3000")
}

func loadToday() {

	content, err := ioutil.ReadFile("today.json")

	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(content, &Today)

	if err != nil {
		log.Fatal(err)
	}
}
