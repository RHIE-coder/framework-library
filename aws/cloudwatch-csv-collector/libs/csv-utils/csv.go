package csvUtils

import (
	"encoding/csv"
	"os"
)

type CSVHandler struct {
	file   *os.File
	writer *csv.Writer
}

func (handler *CSVHandler) CreateCSVFile(filename string) {
	file, err := os.Create(filename)
	if err != nil {
		panic(err)
	}

	handler.file = file
	handler.writer = csv.NewWriter(file)
}

func (handler *CSVHandler) Write(message []string) {
	err := handler.writer.Write(message)
	if err != nil {
		panic(err)
	}

	handler.writer.Flush()
}

func (handler *CSVHandler) Close() {
	handler.file.Close()
}
