package main

import (
	"io/ioutil"
	"log"
	"net/http"
)

func main() {

	res, err := http.Get("http://al-yaqeen.com/content/xml/the_hague.xml")

	if err != nil {
		log.Fatal(err)
	}

	robots, err := ioutil.ReadAll(res.Body)
	res.Body.Close()

	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile("the_hague.xml", robots, 0665)

	if err != nil {
		log.Fatal(err)
	}
}
