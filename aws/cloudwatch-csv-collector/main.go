package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"

	cloudWatch "cloudwatchCsvCollector/libs/aws-clients"
	csvUtils "cloudwatchCsvCollector/libs/csv-utils"
	timeUtils "cloudwatchCsvCollector/libs/time-utils"
)

func main() {
	// beforeHook2()
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
		return fmt.Sprintf("%d, %s", cwof.Timestamp, cwof.Message)
	})
	unixTimestamp := time.Now()
	localDateTime := timeUtils.TimestampToLocation(unixTimestamp.Unix(), "Asia/Seoul")
	dateString := localDateTime.Format(timeUtils.DateOnly)
	csvHandler := csvUtils.CSVHandler{}
	csvHandler.CreateCSVFile(BASE_CSV_NAME + dateString + ".csv")
	csvHandler.Write([]string{"datetime", "device-id", "address"})
	for _, logMsg := range logResults {
		fmt.Println(logMsg)
		return
		// requiredMessageSection := strings.Split(logMsg, "[CSVInfo]")
		// splitedMessage := strings.Split(requiredMessageSection[1], ",")
		// for idx, msg := range splitedMessage {
		// 	splitedMessage[idx] = strings.Trim(strings.Split(msg, ":")[1], " ")
		// }
		// csvHandler.Write(splitedMessage)
	}
	csvHandler.Close()

	// 	var message *string
	// 	message = new(string)
	// 	*message = "Mar  7 05:25:19 ip-172-31-0-107 web: 2023/03/07 05:25:19 [CSVInfo] device-id: 998a8ee2-a2ec-4dc0-9585-08ac12fa6644, address: 0x2L55WddXyl4it6MdDXOmXMleNTdPKZ1YnXvky87B"

}
