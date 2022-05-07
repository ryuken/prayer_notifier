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

	if err != nil {
		//fmt.Println(err)
		return
	}

	// Check the connection
	err = client.Ping(ctx, nil)

	if err != nil {
		//fmt.Println(err)
		return
	}

	//fmt.Println("Connected to MongoDB!")

	collection := client.Database("islamdevice").Collection("reminders")

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		//fmt.Println(err)
		return
	}

	var reminders []bson.M

	if err = cursor.All(ctx, &reminders); err != nil {
		//fmt.Println(err)
		return
	}

	js, _ := bson.MarshalJSON(reminders)

	err = ioutil.WriteFile("reminders.json", js, 0644)

	if err != nil {
		//fmt.Println(err)
		return
	}

	fmt.Println("Saved reminders")
}
