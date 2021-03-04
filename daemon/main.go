package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	tools "github.com/ryuken/th_tools"

	"github.com/fsnotify/fsnotify"
	"github.com/justinas/alice"
	"github.com/robfig/cron"
	"github.com/rs/cors"
	"github.com/spf13/viper"

	"github.com/jpillora/overseer"
	"github.com/jpillora/overseer/fetcher"
	"github.com/y0ssar1an/q"
)

type Config struct {
	City    string
	Enabled []string
}

type Item struct {
	Date     string
	Fajr     string
	Sunrise  string
	Dhuhr    string
	Asr      string
	Maghrib  string
	Isha     string
	Midnight string
}

var Version = "2.2"
var Today Item

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

func refresh() {

	Download()
	ParseToday()
	loadToday()
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
		Download()
	})

	refresh()

	//fmt.Println(Today)

	daemon := cron.New()
	daemon.AddFunc("@every 24h", refresh)
	daemon.AddFunc("@daily", ParseToday)
	daemon.AddFunc("@every 12h", loadToday)
	daemon.AddFunc("@every 1m", check)
	daemon.Start()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedHeaders: []string{"*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "HEAD", "OPTIONS"},
	})

	ht := tools.HttpTool{}
	ht.Init()

	ht.Get("/brightness", alice.New(c.Handler).Then(tools.AppHandler(brightness)), nil)
	ht.Get("/fullscreen", alice.New(c.Handler).Then(tools.AppHandler(fullscreen)), nil)

	ht.Get("/today", alice.New(c.Handler).Then(http.HandlerFunc(todayRead)), nil)
	ht.Get("/nextPrayer", alice.New(c.Handler).Then(tools.AppHandler(nextPrayer)), nil)

	ht.Get("/config", alice.New(c.Handler).Then(http.HandlerFunc(configRead)), nil)
	//ht.Post("/config", alice.New(c.Handler).Then(tools.AppHandler(configUpdate)), nil)
	ht.Get("/configu", alice.New(c.Handler).Then(tools.AppHandler(configUpdate)), nil)

	ht.Get("/stop", alice.New(c.Handler).Then(tools.AppHandler(stopHTTP)), nil)

	ht.Get("/qm", alice.New(c.Handler).Then(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("xDGJGDx"))
	})), nil)

	ht.Router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public")))

	http.Handle("/", ht.Router)

	ht.Route(state.Listener, nil)
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