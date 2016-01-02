package main

import (
	"log"
	"io/ioutil"
	"net/http"
)

func Download() {

	const layout = "01"   // Month
	
	res, err := http.Get("http://al-yaqeen.com/content/xml/the_hague.xml")

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

	err = ioutil.WriteFile("the_hague.xml", robots, 0665)

	if err != nil {
		log.Println(err)
		return
	}
	
	log.Println("Finished download")
}
