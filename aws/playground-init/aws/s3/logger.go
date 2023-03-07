package logger

import (
	"bytes"
	"context"
	"errors"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go/aws"
)

type S3Logger struct {
	Client *s3.Client
	Bucket string
}

func (logger *S3Logger) InitClient(
	access_key string,
	secret_key string,
	region string,
	bucket_name string,
) error {

	if access_key == "" {
		return errors.New("access_key is required")
	}

	if secret_key == "" {
		return errors.New("secret_key is required")
	}

	if region == "" {
		return errors.New("region is required")
	}

	if bucket_name == "" {
		return errors.New("bucket_name is required")
	}

	creds := credentials.NewStaticCredentialsProvider(access_key, secret_key, "")

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion("ap-northeast-1"),
	)

	logger.Client = s3.NewFromConfig(cfg)
	logger.Bucket = bucket_name

	return err
}

func (logger *S3Logger) Upload(filename string, message string) error {
	uploader := manager.NewUploader(logger.Client)

	_, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(logger.Bucket),
		Key:    aws.String(filename),
		Body:   bytes.NewReader([]byte(message)),
	})
	return err
}

func (logger *S3Logger) Read(filename string) (*s3.GetObjectOutput, error) {
	result, err := logger.Client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(logger.Bucket),
		Key:    aws.String(filename),
	})

	return result, err
}
