package main

import (
	"context"
	"fmt"
	"os"
	"time"

	runtime "github.com/aws/aws-lambda-go/lambda"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	graphql "github.com/hasura/go-graphql-client"
)

var query struct {
	GetPrayerTimesV2 struct {
		Times []struct {
			Day      graphql.Int
			Month    graphql.Int
			Fadjr    graphql.String
			Dhoehr   graphql.String
			Maghrib  graphql.String
			Ishaa    graphql.String
			Shoeroeq graphql.String
			Year     graphql.Int
			Asr      graphql.String
		}
	} `graphql:"getPrayerTimesV2(id: $cityId)"`
}

func handleRequest(ctx context.Context) (data string, err error) {

	// Set client options
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)

	defer func() {

		if r := recover(); r != nil {
			data = ""
			err = r.(error)
		}

		if client != nil {
			fmt.Println("Closing connection...")
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

	fmt.Println("Connected to MongoDB!")

	prayerCollection := client.Database("islamdevice").Collection("prayers")

	// Den Haag
	variables := map[string]interface{}{
		"cityId": graphql.Int(29246),
	}

	graphQL := graphql.NewClient("https://www.al-yaqeen.com/wp/graphql", nil)
	err = graphQL.Query(context.Background(), &query, variables)
	if err != nil {
		panic(err)
	}

	for _, item := range query.GetPrayerTimesV2.Times {

		prayer := make(map[string]interface{})

		date, _ := time.Parse("2 1 2006", fmt.Sprintf("%d %d %d", item.Day, item.Month, item.Year))
		day := date.Format("02-01-2006")

		prayer["Fajr"] = item.Fadjr
		prayer["Sunrise"] = item.Shoeroeq
		prayer["Dhuhr"] = item.Dhoehr
		prayer["Asr"] = item.Asr
		prayer["Maghrib"] = item.Maghrib
		prayer["Isha"] = item.Ishaa
		prayer["Date"] = day
		prayer["City"] = "Den Haag"

		update := bson.D{{
			"$set", prayer,
		}}

		filter := bson.D{{"Date", day}}
		opts := options.Update().SetUpsert(true)

		_, err = prayerCollection.UpdateOne(ctx, filter, update, opts)

		if err != nil {
			panic(err)
		}
	}

	return
}

func main() {
	runtime.Start(handleRequest)

	// fmt.Println("Start")
	// ctx := context.TODO()
	// result, err := handleRequest(ctx)
	// fmt.Println(result, err)
}
