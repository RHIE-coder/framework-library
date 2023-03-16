package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/user/:name*", func(c *fiber.Ctx) error {
		msg := fmt.Sprintf("the name is %s", c.Params("name"))
		return c.SendString(msg)
	})

	app.Get("/api/*", func(c *fiber.Ctx) error {
		msg := fmt.Sprintf("✋ %s", c.Params("*"))
		return c.SendString(msg) // => ✋ register
	})

	app.Get("/ip", func(c *fiber.Ctx) error {
		msg := c.IP()
		return c.SendString(msg)
	})

	log.Fatal(app.Listen(":3000"))
}
