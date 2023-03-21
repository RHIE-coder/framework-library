package main

import (
	"fmt"
	"log"
	"runtime"
	"time"

	"github.com/gofiber/fiber/v2"
)

var exNum int = 0

func main() {
	var num int = 0 // 주의, preforking 시 데이터가 맞지 않을 수 있음!
	fmt.Println(runtime.NumCPU())
	app := fiber.New(fiber.Config{
		Prefork: true,
	})
	app.Use("/", func(c *fiber.Ctx) error {
		log.Println("M/W")
		log.Println(c)
		return c.Next()
	})

	app.Get("/1", func(c *fiber.Ctx) error {
		num++
		log.Printf("Count In: %d\n", num)
		return c.SendString("hello world")
	})

	micro := fiber.New()

	app.Mount("/micro", micro)

	micro.Get("/2", func(c *fiber.Ctx) error {
		log.Printf("Check Number: %d\n", num)
		return c.SendString(micro.MountPath()) // "/micro"
	})

	api := app.Group("/api", func(c *fiber.Ctx) error {
		log.Println("group: /api")
		return c.Next()
		// DON'T: c.SendString("...")
		// DON'T: nil
	})

	v1 := api.Group("/v1", func(c *fiber.Ctx) error {
		log.Println("group: /v1")
		return c.Next()
	})

	v1.Get("/3", func(c *fiber.Ctx) error {
		log.Println("3")
		return c.SendStatus(fiber.StatusOK)
	})

	v1.Get("/4", func(c *fiber.Ctx) error {
		log.Println("4")
		return c.SendStatus(fiber.StatusOK)
	})

	app.Route("/admin", func(router fiber.Router) {

		router.Get("/5", func(c *fiber.Ctx) error {
			return c.SendString("Hello, Admin!")
		}).Name("five")

		router.Get("/6/:id", func(c *fiber.Ctx) error {
			log.Printf("%+v\n", c.Route())
			id := c.Params("id")
			return c.SendString("User ID: " + id)
		})

	}, "amin")

	// fmt.Printf("Handler Count: %d\n", app.HandlersCount())
	// // fmt.Println(admin.Stack())
	// data, _ := json.MarshalIndent(app.Stack(), "", "    ")
	// fmt.Println(string(data))
	// fmt.Println("=======================")
	// data, _ = json.MarshalIndent(app.GetRoute("aminfive"), "", "  ")
	// fmt.Println(string(data))

	// fmt.Println("||--------------------||")
	// app.Hooks().OnRoute(func(r fiber.Route) error {
	// 	data, _ := json.MarshalIndent(r, "", "    ")
	// 	fmt.Println(string(data))
	// 	return nil
	// })

	app.Hooks().OnFork(func(pid int) error {
		fmt.Println("ON FORKING")
		fmt.Println(pid)
		return nil
	})

	app.Post("/7", func(c *fiber.Ctx) error {

		type Sample struct {
			A string `json:"username"`
			b string `json:"password"`
		}

		return c.JSON(&Sample{
			A: "hello",
			b: "world",
		})
	})

	app.Get("/8", func(c *fiber.Ctx) error {
		exNum++
		time.Sleep(3 * time.Second)
		log.Printf("Count In: %d\n", exNum)
		return c.SendString(fmt.Sprintf("%d", exNum))
	})
	// fmt.Println(" --- static ---")
	app.Static("/", "./public") // https://docs.gofiber.io/api/app
	app.Listen(":5000")
}
