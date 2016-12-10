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

	"github.com/jpillora/overseer"
	"github.com/jpillora/overseer/fetcher"
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
var Version = "1.2"

func main() {
	overseer.Run(overseer.Config{
		Program: program,
		Address: ":3000",
		Fetcher: &fetcher.HTTP{
			URL:      "http://128.199.58.69/prayer_notifier/daemon",
			Interval: 10 * time.Second,
		},
	})
}

func program(state overseer.State) {

	fmt.Println("current", Version)

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

	Download()
	ParseToday()
	loadToday()

	//fmt.Println(Today)

	daemon := cron.New()
	daemon.AddFunc("@monthly", Download)
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
	ht.Post("/config", alice.New(c.Handler).Then(tools.AppHandler(configUpdate)))

	ht.Get("/qm", alice.New(c.Handler).Then(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("xDGJGDx"))
	})))

	ht.Route(state.Listener, nil, "3000")
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
