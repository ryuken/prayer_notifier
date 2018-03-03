package main

import (
	"log"
	"strings"
	"io/ioutil"
	"net/http"
	"github.com/spf13/viper"
)

func Download() {

	res, err := http.Get("https://4b0dq407n5.execute-api.eu-central-1.amazonaws.com/Production/prayers?City=" + strings.Replace(viper.GetString("City"), " ", "%20", 1))

	if err != nil {
		log.Println(err)
		return
	}

	robots, err := ioutil.ReadAll(res.Body)
	res.Body.Close()

	if err != nil {
		log.Println(err)
		return
	}

	err = ioutil.WriteFile("city.json", robots, 0665)

	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Finished download")
}
