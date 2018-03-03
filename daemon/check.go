package main

import (
	"bytes"
	"fmt"
	"os/exec"
	"regexp"
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
				play("mpc", "play", "1")
				break
			}
		}
	} else if currentTime == Today.Sunrise {
		for _, prayer := range enabled {
			if "Sunrise" == prayer {
				fmt.Println("It's Sunrise!")
				play("mpc", "play", "2")
				break
			}
		}
	} else if currentTime == Today.Dhuhr {
		fmt.Println("It's Dhuhr!")

		for _, prayer := range enabled {
			if "Dhuhr" == prayer {
				play("mpc", "play", "1")
				break
			}
		}
	} else if currentTime == Today.Asr {
		fmt.Println("It's Asr!")

		for _, prayer := range enabled {
			if "Asr" == prayer {
				play("mpc", "play", "1")
				break
			}
		}
	} else if currentTime == Today.Maghrib {
		fmt.Println("It's Maghrib!")

		for _, prayer := range enabled {
			if "Maghrib" == prayer {
				play("mpc", "play", "1")
				break
			}
		}
	} else if currentTime == Today.Isha {
		fmt.Println("It's Isha!")

		for _, prayer := range enabled {
			if "Isha" == prayer {
				play("mpc", "play", "1")
				break
			}
		}
	}
}

func play(player, action, id string) {

	cmd := exec.Command("mpc", "playlist")
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		fmt.Println(err)
	}

	var status []string

	//fmt.Println(out.String())
	//fmt.Println("Current playlist is not azan.playlist")

	// get current playing status
	cmd = exec.Command("mpc", "status")
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
	// Print status
	re := regexp.MustCompile(`\[(\w+)\] #(\d+)/(\w+)\s+(\w+:\w+)/(\w+:\w+)`)
	//fmt.Printf("%q\n", re.FindStringSubmatch("[playing] #1/1 0:05/27:02"))
	status = re.FindStringSubmatch(fmt.Sprintf("%q\n", out.String()))
	//fmt.Println(status)

	if len(status) > 0 {
		// remove temporary playlist
		cmd = exec.Command("mpc", "rm", "temp.playlist")
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}
		//fmt.Println("Removed temporary playlist")

		// save playlist as temporary playlist
		cmd = exec.Command("mpc", "save", "temp.playlist")
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}

		//fmt.Println("Saved current playlist to temp.playlist")

		// clear current playlist
		cmd = exec.Command("mpc", "clear")
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}
		//fmt.Println("Cleared playlist")
	}

	// load azan playlist
	cmd = exec.Command("mpc", "load", "azan.playlist")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}

	//fmt.Println("Loaded azan.playlist")

	cmd = exec.Command(player, action, id)
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}

	//fmt.Println("playing first from playlist and sleeping 3:21 mintues")

	time.Sleep(3*time.Minute + 21*time.Second)

	// stop playing
	cmd = exec.Command("mpc", "stop")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println("Stopped playing azan")

	// clear temporary playlist
	cmd = exec.Command("mpc", "clear")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println("Cleared playlist")

	if len(status) > 0 {
		// load temp playlist
		cmd = exec.Command("mpc", "load", "temp.playlist")
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}
		//fmt.Println("Loaded temp.playlist again")

		// resume  playlist
		cmd = exec.Command("mpc", "play", status[2])
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}
		//fmt.Println("Resumed original playlist")

		// seek to original position
		cmd = exec.Command("mpc", "seek", status[4])
		err = cmd.Run()
		if err != nil {
			fmt.Println(err)
		}
		//fmt.Println("Seeked to original position")
	}
}
