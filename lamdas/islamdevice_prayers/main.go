package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type params struct {
	City string `json:"city"`
}

type prayer struct {
	City     string
	Date     string
	Fajr     string
	Sunrise  string
	Dhuhr    string
	Asr      string
	Maghrib  string
	Isha     string
	Midnight string
}

func HandleRequest(ctx context.Context, data params) ([]*prayer, error) {

	var prayers []*prayer

	log.Println("Finding for", data.City)

	// Set client options
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)

	if err != nil {
		return prayers, err
	}

	// Check the connection
	err = client.Ping(ctx, nil)

	if err != nil {
		return prayers, err
	}

	fmt.Println("Connected to MongoDB!")

	prayerCollection := client.Database("islamdevice").Collection("prayers")

	filter := bson.D{{
		"City",
		data.City,
	}}

	cur, err := prayerCollection.Find(ctx, filter)
	if err != nil {
		return prayers, err
	}

	defer cur.Close(ctx)

	for cur.Next(ctx) {

		var result prayer
		err := cur.Decode(&result)
		if err != nil {
			return prayers, err
		}

		prayers = append(prayers, &result)
	}

	if err := cur.Err(); err != nil {
		return prayers, err
	}

	log.Println(len(prayers))

	return prayers, err
}

func main() {
	lambda.Start(HandleRequest)

	// p := params{}
	// p.City = "Den Haag"
	// ctx := context.Background()
	// result, err := HandleRequest(ctx, p)

	// log.Println("Result:", result)
	// log.Println("Error:", err)
}
