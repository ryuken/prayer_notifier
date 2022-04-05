// package main

// import (
// 	"context"
// 	"fmt"
// 	"io/ioutil"
// 	"log"
// 	"net/http"
// 	"os"
// 	"regexp"
// 	"strings"
// 	"time"

// 	"github.com/aws/aws-lambda-go/lambda"
// 	"github.com/tidwall/gjson"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// )

// type City struct {
// 	Name    string
// 	Country string
// }

// func HandleRequest(ctx context.Context) (string, error) {

// 	now := time.Now()

// 	// Set client options
// 	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))

// 	// Connect to MongoDB
// 	client, err := mongo.Connect(ctx, clientOptions)

// 	if err != nil {
// 		return "", err
// 	}

// 	// Check the connection
// 	err = client.Ping(ctx, nil)

// 	if err != nil {
// 		return "", err
// 	}

// 	fmt.Println("Connected to MongoDB!")

// 	var cities []City
// 	cityCollection := client.Database("islamdevice").Collection("cities")
// 	prayerCollection := client.Database("islamdevice").Collection("prayers")

// 	cur, err := cityCollection.Find(ctx, bson.D{})
// 	if err != nil {
// 		return "", err
// 	}

// 	defer cur.Close(ctx)

// 	for cur.Next(ctx) {

// 		var result City
// 		err := cur.Decode(&result)
// 		if err != nil {
// 			return "", err
// 		}

// 		cities = append(cities, result)
// 	}

// 	if err := cur.Err(); err != nil {
// 		return "", err
// 	}

// 	log.Println(len(cities))

// 	re := regexp.MustCompile("\\d\\d:\\d\\d")

// 	for _, city := range cities {

// 		count, err := prayerCollection.CountDocuments(ctx, bson.M{
// 			"City": city.Name,
// 			"Date": now.Format("02-01-2006"),
// 		})

// 		//log.Println("I have", count, "documents for", city.Name)

// 		if err != nil {
// 			return "", err
// 		}

// 		if count > 0 {
// 			log.Println("skipping")
// 			continue
// 		}

// 		url := `http://api.aladhan.com/v1/calendarByCity?city={{.City}}&country={{.Country}}&timezonestring=Europe%2FAmsterdam&method=2&month={{.Month}}&year={{.Year}}`
// 		url = strings.Replace(url, "{{.City}}", strings.Replace(city.Name, " ", "%20", 1), 1)
// 		url = strings.Replace(url, "{{.Country}}", city.Country, 1)
// 		url = strings.Replace(url, "{{.Month}}", now.Format("1"), 1)
// 		url = strings.Replace(url, "{{.Year}}", now.Format("2006"), 1)

// 		res, err := http.Get(url)

// 		if err != nil {
// 			return "", err
// 		}

// 		json, err := ioutil.ReadAll(res.Body)
// 		res.Body.Close()

// 		value := gjson.GetBytes(json, "data")

// 		for _, item := range value.Array() {

// 			prayer := make(map[string]interface{})

// 			date, _ := time.Parse("02 Jan 2006", item.Get("date.readable").String())

// 			prayer["Fajr"] = re.FindString(item.Get("timings.Fajr").String())
// 			prayer["Sunrise"] = re.FindString(item.Get("timings.Sunrise").String())
// 			prayer["Dhuhr"] = re.FindString(item.Get("timings.Dhuhr").String())
// 			prayer["Asr"] = re.FindString(item.Get("timings.Asr").String())
// 			prayer["Maghrib"] = re.FindString(item.Get("timings.Maghrib").String())
// 			prayer["Isha"] = re.FindString(item.Get("timings.Isha").String())
// 			prayer["Midnight"] = re.FindString(item.Get("timings.Midnight").String())
// 			prayer["Date"] = date.Format("02-01-2006")
// 			prayer["City"] = city.Name

// 			_, err = prayerCollection.InsertOne(ctx, prayer)

// 			if err != nil {
// 				return "", err
// 			}
// 		}
// 	}

// 	return "finished", err
// }

// func main() {
// 	lambda.Start(HandleRequest)

// 	// ctx := context.TODO()
// 	// result, err := HandleRequest(ctx)

// 	// log.Println(result, err)
// }
