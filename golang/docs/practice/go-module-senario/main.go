package main

import (
	"rrr/external"
	"rrr/locally"

	"github.com/alice/math"
	logger "github.com/bob"
)

func main() {
	logger.Log("hello")
	external.Why()
	math.Sum(10, 20)
	locally.SaveFile()
}
