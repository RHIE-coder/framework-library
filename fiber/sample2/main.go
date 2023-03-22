package main

import (
	"fmt"
	"runtime"

	"github.com/gofiber/fiber/v2"
)

func main() {
	fmt.Println(runtime.NumCPU())
	app := fiber.New(fiber.Config{})

	app.Static("/", "./public") // https://docs.gofiber.io/api/app
	app.Listen(":4000")
}
