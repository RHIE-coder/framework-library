package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"

	cloudWatch "cloudwatchCsvCollector/libs/aws-clients"
	csvUtils "cloudwatchCsvCollector/libs/csv-utils"
	timeUtils "cloudwatchCsvCollector/libs/time-utils"
)

func logMessageParse(logMsg string) []string {
	deviceIdExpression, _ := regexp.Compile("device-id: [a-zA-Z0-9-]*")
	addressExpression, _ := regexp.Compile("address: [a-zA-Z0-9]*")
	timestampString := strings.Split(logMsg, "||")[0]
	timestamp, _ := strconv.ParseInt(timestampString, 10, 64)
	localDateTime := timeUtils.TimestampToLocation(timestamp, "Asia/Seoul").Format(timeUtils.DateTime)
	deviceId := strings.Split(deviceIdExpression.FindString(logMsg), ": ")[1]
	address := strings.Split(addressExpression.FindString(logMsg), ": ")[1]
	return []string{deviceId, address, localDateTime}
}

func beforeHook() {
	startDateTime := "2023-03-09 00:00:00"
	endDateTime := "2023-03-09 23:59:59"
	start, err1 := time.Parse(timeUtils.DateTime, startDateTime)
	end, err2 := time.Parse(timeUtils.DateTime, endDateTime)
	fmt.Println(err1)
	fmt.Println(err2)
	fmt.Println(start.UnixMilli())
	fmt.Println(end.UnixMilli())
	os.Exit(2)
}

func main() {
	// beforeHook()
	var err error

	err = godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	ACCESS_KEY := os.Getenv("AWS_ACCESS_KEY")
	SECRET_KEY := os.Getenv("AWS_SECRET_KEY")
	REGION_NAME := os.Getenv("REGION_NAME")
	CLOUDWATCH_LOG_GROUP_NAME := os.Getenv("CLOUDWATCH_LOG_GROUP_NAME")
	FILTER_PATTERN := os.Getenv("FILTER_PATTERN")
	BASE_CSV_NAME := os.Getenv("BASE_CSV_NAME")

	cw := cloudWatch.CloudWatch{}
	cw.NewClient(ACCESS_KEY, SECRET_KEY, REGION_NAME)

	fmt.Println("Retrieving log data for log group: ", CLOUDWATCH_LOG_GROUP_NAME)

	logResults := cw.GetAllLogs(CLOUDWATCH_LOG_GROUP_NAME, FILTER_PATTERN, func(cwof cloudWatch.CloudWatchLogOutputFormat) string {
		return fmt.Sprintf("%d||%s", cwof.Timestamp, cwof.Message)
	})
	// unixTimestamp := time.Now()
	// localDateTime := timeUtils.TimestampToLocation(unixTimestamp.Unix(), "Asia/Seoul")
	// dateString := localDateTime.Format(timeUtils.DateOnly)
	dateString := "2023-03-14"
	csvHandler := csvUtils.CSVHandler{}
	csvHandler.CreateCSVFile(BASE_CSV_NAME + dateString + ".csv")
	csvHandler.Write([]string{"device-id", "address", "datetime"})
	for _, logMsg := range logResults {
		csvHandler.Write(logMessageParse(logMsg))
	}
	csvHandler.Close()
}
