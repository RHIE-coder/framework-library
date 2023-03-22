package main

import (
	"fmt"
	"log"
	"runtime"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var exNum int = 0

func main() {

	var num int = 0 // 주의, preforking 시 데이터가 맞지 않을 수 있음!
	fmt.Println(runtime.NumCPU())
	app := fiber.New(fiber.Config{
		// Prefork: true,
	})
	// app.Use(cache.New(cache.Config{
	// 	// CacheControl:         true,
	// 	Methods: []string{fiber.MethodGet, fiber.MethodPost, fiber.MethodHead},
	// 	// StoreResponseHeaders: true,
	// }))
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:4000",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	app.Use(cache.New(cache.Config{
		// CacheControl:         true,
		Methods: []string{fiber.MethodGet, fiber.MethodPost, fiber.MethodHead},
		// StoreResponseHeaders: true,
		Expiration: 5 * time.Second,
	}))

	app.Use("/", func(c *fiber.Ctx) error {
		log.Println("M/W")
		log.Println(c)
		return c.Next()
	})

	app.Use(compress.New(compress.Config{
		Next: func(c *fiber.Ctx) bool {
			return c.Path() == "/dont_compress"
		},
		Level: compress.LevelBestSpeed, // 1
	}))

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

	app.Get("/7", func(c *fiber.Ctx) error {
		time.Sleep(3 * time.Second)
		type Sample struct {
			A string `json:"username"`
			B string `json:"password"`
		}

		return c.JSON(&Sample{
			A: "hello",
			B: "world",
		})
	})

	app.Post("/8", func(c *fiber.Ctx) error {
		exNum++
		time.Sleep(1 * time.Second)
		log.Printf("Count In: %d\n", exNum)
		return c.SendString(fmt.Sprintf("%d", exNum))
	})

	app.Static("/", "./public") // https://docs.gofiber.io/api/app
	app.Use(basicauth.New(basicauth.Config{
		// Next: func(c *fiber.Ctx) bool {
		// 	fmt.Println("AUTH NEXT()")
		// 	return false
		// },
		Users: map[string]string{
			"admin": "123456",
		},
		Realm: "member",
		Authorizer: func(user, pass string) bool {
			fmt.Println(user, pass)
			if user == "john" && pass == "doe" {
				return true
			}
			if user == "admin" && pass == "123456" {
				return true
			}
			return false
		},
		Unauthorized: func(c *fiber.Ctx) error {
			fmt.Println("Unauthorized")
			c.Status(fiber.StatusUnauthorized)
			return c.JSON(map[string]string{
				"status": "unauthorized",
			})
		},
	}))

	app.Post("/10", func(c *fiber.Ctx) error {
		return c.SendString("User Data!")
	})

	app.Post("/12", func(c *fiber.Ctx) error {
		// data, _ := json.MarshalIndent(c.Request(), "", "    ")
		// c.Response().Header.Add("Cache-Time", "6000")
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
		// return c.SendString(fmt.Sprintf("%d", 100))
	})

	fmt.Println(" --- static ---")
	app.Listen(":5000")
}
