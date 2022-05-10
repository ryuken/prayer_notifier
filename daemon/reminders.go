package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
)

func remindersRead(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "reminders.json")
}

func getReminders() {

	ctx := context.TODO()

	// Set client options
	clientOptions := options.Client().ApplyURI(viper.GetString("MONGODB_URI"))

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)

	defer func() {

		if r := recover(); r != nil {
			err = r.(error)
			fmt.Println(err)
		}

		if client != nil {
			client.Disconnect(ctx)
		}
	}()

	if err != nil {
		panic(err)
	}

	// Check the connection
	err = client.Ping(ctx, nil)

	if err != nil {
		panic(err)
	}

	//fmt.Println("Connected to MongoDB!")

	collection := client.Database("islamdevice").Collection("reminders")

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		panic(err)
	}

	var reminders []bson.M

	if err = cursor.All(ctx, &reminders); err != nil {
		panic(err)
	}

	js, _ := bson.MarshalJSON(reminders)

	err = ioutil.WriteFile("reminders.json", js, 0644)

	if err != nil {
		panic(err)
	}

	fmt.Println("Saved reminders")
}
