package main

import (
	"fmt"
	"net/http"
	"os/exec"
	"time"

	"github.com/spf13/viper"
)

const clock = "15:04" // Clock

func check() {

	t := time.Now()
	currentTime := t.Format(clock)

	fmt.Println("Current time", currentTime)

	enabled := viper.GetStringSlice("Enabled")

	if currentTime == Today.Fajr {
		fmt.Println("It's Fajr!")

		for _, prayer := range enabled {
			if "Fajr" == prayer {
				play("azan12.mp3")
				break
			}
		}
	} else if currentTime == Today.Sunrise {
		fmt.Println("It's Sunrise!")

		for _, prayer := range enabled {
			if "Sunrise" == prayer {
				play("bleep.mp3")
				break
			}
		}
	} else if currentTime == Today.Dhuhr {
		fmt.Println("It's Dhuhr!")

		for _, prayer := range enabled {
			if "Dhuhr" == prayer {
				play("azan12.mp3")
				break
			}
		}
	} else if currentTime == Today.Asr {
		fmt.Println("It's Asr!")

		for _, prayer := range enabled {
			if "Asr" == prayer {
				play("azan12.mp3")
				break
			}
		}
	} else if currentTime == Today.Maghrib {
		fmt.Println("It's Maghrib!")

		for _, prayer := range enabled {
			if "Maghrib" == prayer {
				play("azan12.mp3")
				break
			}
		}
	} else if currentTime == Today.Isha {
		fmt.Println("It's Isha!")

		for _, prayer := range enabled {
			if "Isha" == prayer {
				play("azan12.mp3")
				break
			}
		}
	}
}

func play(audio string) {

	cmd := exec.Command("python3", "~/prayer_notifier/daemon/scripts/play.py", getIp(), audio)
	err := cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
}

// stop playing
func stop() error {

	cmd := exec.Command("python3", "~/prayer_notifier/daemon/scripts/stop.py")
	err := cmd.Start()

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func stopHTTP(w http.ResponseWriter, r *http.Request) (string, interface{}, error) {

	err := stop()

	return "json", err == nil, err
}
