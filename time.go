package main

import (
	"fmt"
	"strconv"
	"strings"
)

func ConvertTo24(time, format string) string {
	result := strings.Split(time, ":")

	first, _ := strconv.ParseInt(result[0], 10, 8)
	second, _ := strconv.ParseInt(result[1], 10, 8)

	if "AM" == format {

		if first < 10 {
			result[0] = "0" + result[0]
		}

		if second < 10 && len(result[1]) < 2 {
			result[1] = "0" + result[1]
		}

	} else if "PM" == format {

		if first < 11 {
			result[0] = strconv.FormatInt(12+first, 10)
		}

		if second < 10 && len(result[1]) < 2 {
			result[1] = "0" + result[1]
		}
	}

	return fmt.Sprintf("%s:%s", result[0], result[1])
}
