package main

import "fmt"
import "time"

func main() {

	ticker := time.NewTicker(5 * time.Second)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				// do stuff
				fmt.Println(time.Now())
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()
}
