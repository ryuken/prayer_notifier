package main

import (
	// "strconv"
	// "strings"
	"time"
)

func ConvertTo24(cTime string) string {

	t, _ := time.Parse("3:04", cTime)

	return t.Format("15:04")

	// format := time[len(time)-2:]

	// result := strings.Split(time[:5], ":")

	// first, _ := strconv.ParseInt(result[0], 10, 8)
	// second, _ := strconv.ParseInt(result[1], 10, 8)

	// if "am" == format {

	// 	if first < 10 {
	// 		result[0] = "0" + result[0]
	// 	}

	// 	if second < 10 && len(result[1]) < 2 {
	// 		result[1] = "0" + result[1]
	// 	}

	// } else if "pm" == format {

	// 	if first < 12 {
	// 		result[0] = strconv.FormatInt(12+first, 10)
	// 	}

	// 	if result[0] == "24" {
	// 		result[0] = "00"
	// 	}

	// 	if second < 10 && len(result[1]) < 2 {
	// 		result[1] = "0" + result[1]
	// 	}
	// }

	// return strings.TrimSpace(fmt.Sprintf("%s:%s", result[0], result[1]))
}
