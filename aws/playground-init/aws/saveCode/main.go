package cloudwatch

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs"
	"github.com/joho/godotenv"
)

func basicUsage() {
	REGION_NAME := "ap-northeast-1"
	var err error

	err = godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	ACCESS_KEY := os.Getenv("AWS_ACCESS_KEY")
	SECRET_KEY := os.Getenv("AWS_SECRET_KEY")

	creds := credentials.NewStaticCredentialsProvider(ACCESS_KEY, SECRET_KEY, "")

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion(REGION_NAME),
	)

	if err != nil {
		log.Fatal("Error get client credential")
	}

	client := cloudwatchlogs.NewFromConfig(cfg)

	groupName := "/aws/elasticbeanstalk/Goforwalletowen-env/var/log/web.stdout.log"
	filterPattern := "ERROR"

	var nextToken *string
	params := &cloudwatchlogs.FilterLogEventsInput{
		LogGroupName:  &groupName,
		FilterPattern: &filterPattern,
		NextToken:     nextToken,
	}

	resp, err := client.FilterLogEvents(context.Background(), params)
	if err != nil {
		panic("failed to retrieve log events, " + err.Error())
	}

	// Print out the log events
	for _, event := range resp.Events {
		fmt.Println(*event.EventId)
		fmt.Println(*event.IngestionTime)
		fmt.Println(*event.LogStreamName)
		fmt.Println(*event.Message)
		fmt.Println(*event.Timestamp)
		fmt.Println("--------------------")
	}
}
