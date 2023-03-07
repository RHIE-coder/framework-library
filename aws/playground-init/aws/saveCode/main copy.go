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

func logGroups() {
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

	logGroups, err := client.DescribeLogGroups(context.TODO(), &cloudwatchlogs.DescribeLogGroupsInput{})
	if err != nil {
		fmt.Println("failed to describe log groups, ", err)
		return
	}

	for _, lg := range logGroups.LogGroups {
		fmt.Println("Retrieving log data for log group: ", *lg.LogGroupName)

		var nextToken *string
		for {
			output, err := client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
				LogGroupName: lg.LogGroupName,
				NextToken:    nextToken,
			})
			if err != nil {
				fmt.Println("failed to filter log events, ", err)
				break
			}

			// process the log events returned in the output

			if output.NextToken == nil {
				break
			}
			nextToken = output.NextToken
		}
	}
}
