package basic

import (
	"fmt"
	"runtime"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/redirect/v2"
	"github.com/gofiber/rewrite/v2"
	"github.com/gofiber/template/html"
)

func FiberRun() {
	fmt.Println(runtime.NumCPU())
	engine := html.New("./public", ".html")
	app := fiber.New(fiber.Config{
		Views: engine,
	})
	app.Use(redirect.New(redirect.Config{
		Rules: map[string]string{
			"/hi": "/hey",
		},
	}))
	app.Use(rewrite.New(rewrite.Config{
		Rules: map[string]string{
			"/old": "/new",
		},
	}))
	app.Static("/", "./public") // https://docs.gofiber.io/api/app
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{})
	})
	app.Post("/hey", func(c *fiber.Ctx) error {
		return c.Render("hello", fiber.Map{})
	})

	app.Post("/new", func(c *fiber.Ctx) error {
		return c.SendString("hello OLD")
	})
	app.Listen(":4000")
}
