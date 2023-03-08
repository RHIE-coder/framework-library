package cloudWatch

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs"
)

type CloudWatchLogOutputFormat struct {
	EventId       string
	IngestionTime int64
	LogStreamName string
	Message       string
	Timestamp     int64
}

type CloudWatch struct {
	client *cloudwatchlogs.Client
}

func (cw *CloudWatch) NewClient(accessKey string, secretKey string, regionName string) {
	creds := credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion(regionName),
	)

	if err != nil {
		log.Fatal("Error get client credential")
	}

	cw.client = cloudwatchlogs.NewFromConfig(cfg)
}

func (cw *CloudWatch) GetAllLogs(logGroupName string, filterPattern string, action func(cwof CloudWatchLogOutputFormat) string) []string {
	var nextToken *string
	messages := []string{}
	for {
		output, err := cw.client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
			LogGroupName:  &logGroupName,
			FilterPattern: &filterPattern,
			NextToken:     nextToken,
		})

		if err != nil {
			log.Fatal("failed to filter log events, ", err)
		}

		for _, event := range output.Events {
			resultMsg := action(CloudWatchLogOutputFormat{
				EventId:       *event.EventId,
				IngestionTime: *event.IngestionTime,
				LogStreamName: *event.LogStreamName,
				Message:       *event.Message,
				Timestamp:     *event.Timestamp,
			})
			messages = append(messages, resultMsg)
		}

		if output.NextToken == nil {
			break
		}

		nextToken = output.NextToken
		log.Println(nextToken) //test
	}

	return messages
}
