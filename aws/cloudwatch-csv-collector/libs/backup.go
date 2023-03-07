package backup

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	cloudWatch "cloudwatchCsvCollector/libs/aws-clients"
)

// func beforeHook() {

// 	flag := 0

// 	var timeval *int64
// 	timeval = new(int64)
// 	*timeval = 1678166720363
// 	fmt.Println(*timeval)

// 	date := time.Unix(0, (*timeval)*int64(time.Millisecond))
// 	// set the time zone to Korea Standard Time (KST)
// 	koreaTZ, err := time.LoadLocation("Asia/Seoul")
// 	if err != nil {
// 		panic(err)
// 	}
// 	date = date.In(koreaTZ)

// 	// format the date as a string
// 	dateString := date.Format("2006-01-02 15:04:05")

// 	// print the resulting date string
// 	fmt.Println(dateString)

// 	var message *string
// 	message = new(string)
// 	*message = "Mar  7 05:25:19 ip-172-31-0-107 web: 2023/03/07 05:25:19 [CSVInfo] device-id: 998a8ee2-a2ec-4dc0-9585-08ac12fa6644, address: 0x2L55WddXyl4it6MdDXOmXMleNTdPKZ1YnXvky87B"

// 	slice := strings.Split(*message, "[CSVInfo]")
// 	csvInfo := strings.Split(slice[1], ",")
// 	for _, value := range csvInfo {
// 		result := strings.Trim(strings.Split(value, ":")[1], " ")
// 		fmt.Println(result)
// 	}

// 	flag = -1

// 	if flag == -1 {
// 		os.Exit(-1)
// 	}
// }

// func beforeHook2() {
// 	fmt.Println(time.Layout)
// 	const DateOnly = "2006-01-02"
// 	currentTime := time.Now()
// 	unixTimestamp := currentTime.Unix()
// 	var unixTimestamp2 int64 = 1678166720363
// 	fmt.Println(timeUtils.TimestampToLocation(unixTimestamp, "Asia/Seoul"))
// 	fmt.Println(timeUtils.TimestampToLocation(unixTimestamp2, "Asia/Seoul"))
// 	os.Exit(-1)
// }

func sss() {
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
	// BASE_CSV_NAME := os.Getenv("BASE_CSV_NAME")

	cw := cloudWatch.CloudWatch{}
	cw.NewClient(ACCESS_KEY, SECRET_KEY, REGION_NAME)

	fmt.Println("Retrieving log data for log group: ", CLOUDWATCH_LOG_GROUP_NAME)

	results := cw.GetAllLogs(CLOUDWATCH_LOG_GROUP_NAME, FILTER_PATTERN, func(cwof cloudWatch.CloudWatchLogOutputFormat) string {
		return cwof.Message
	})

	fmt.Println(results)

	// file, err := os.Create("output.csv")
	// if err != nil {
	// 	panic(err)
	// }
	// defer file.Close()
	// // create a new CSV writer
	// writer := csv.NewWriter(file)

	// // write the CSV header
	// header := []string{"datetime", "device-id", "address"}

	// err = writer.Write(header)

	// if err != nil {
	// 	panic(err)
	// }

	// var nextToken *string
	// for {
	// 	if nextToken != nil {
	// 		fmt.Println("START: " + *nextToken)
	// 	}
	// 	output, err := client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
	// 		LogGroupName:  &CLOUDWATCH_LOG_GROUP_NAME,
	// 		FilterPattern: &FILTER_PATTERN,
	// 		NextToken:     nextToken,
	// 	})
	// 	if err != nil {
	// 		fmt.Println("failed to filter log events, ", err)
	// 		break
	// 	}
	// 	for _, event := range output.Events {
	// 		// writer.Write([]string{*event.Timestamp, })
	// 		fmt.Printf("%s: (%d)[%s] %s :: %d\n",
	// 			*event.EventId,
	// 			*event.IngestionTime,
	// 			*event.LogStreamName,
	// 			*event.Message,
	// 			*event.Timestamp)
	// 	}
	// 	if output.NextToken == nil {
	// 		break
	// 	}

	// 	nextToken = output.NextToken
	// 	fmt.Println("END: " + *nextToken)
	// 	fmt.Println("=========================")
	// }

	// writer.Flush()
}
