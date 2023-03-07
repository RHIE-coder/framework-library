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

func getAll() {
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
	filterPattern := "?CSVInfo"

	fmt.Println("Retrieving log data for log group: ", groupName)

	var nextToken *string
	for {
		if nextToken != nil {
			fmt.Println("START: " + *nextToken)
		}
		output, err := client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
			LogGroupName:  &groupName,
			FilterPattern: &filterPattern,
			NextToken:     nextToken,
		})
		if err != nil {
			fmt.Println("failed to filter log events, ", err)
			break
		}
		for _, event := range output.Events {
			fmt.Printf("%s: (%d)[%s] %s :: %d\n",
				*event.EventId,
				*event.IngestionTime,
				*event.LogStreamName,
				*event.Message,
				*event.Timestamp)
		}
		if output.NextToken == nil {
			break
		}

		nextToken = output.NextToken
		fmt.Println("END: " + *nextToken)
		fmt.Println("=========================")
	}

}
