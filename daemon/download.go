package main

import (
	"io/ioutil"
	"log"
	"net/http"
)

func Download() {

	const layout = "01" // Month

	res, err := http.Get("http://muslimsalat.com/the+hague/monthly.json?key=7606bab53522844593e9615c4dbc621c")

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

	err = ioutil.WriteFile("the_hague.json", robots, 0665)

	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Finished download")
}
