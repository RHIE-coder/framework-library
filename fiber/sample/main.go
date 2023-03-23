package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"runtime"
	"runtime/debug"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/envvar"
	"github.com/gofiber/fiber/v2/middleware/expvar"
	"github.com/gofiber/fiber/v2/middleware/idempotency"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/pprof"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/fiber/v2/middleware/skip"
)

func main2() {
	app := fiber.New()

	// Register pprof middleware
	app.Use(pprof.New())

	// Your application routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// Start server
	app.Listen(":5000")
}

var exNum int = 0 // 주의, preforking 시 데이터가 맞지 않을 수 있음!

func main() {
	var num int = 0               // 주의, preforking 시 데이터가 맞지 않을 수 있음!
	fmt.Println(runtime.NumCPU()) //12
	app := fiber.New(fiber.Config{
		// Prefork: true,
	})

	app.Use(recover.New(recover.Config{
		EnableStackTrace: true,
		StackTraceHandler: func(c *fiber.Ctx, e interface{}) {
			err := c.SendString("ERRRRRROOOOORRR: " + fmt.Sprintf("%+v", e))
			log.Println("1111111111111")
			log.Println(err)
			log.Println("2222222222")
			_, _ = os.Stderr.WriteString(fmt.Sprintf("panic: %v\n%s\n", e, debug.Stack())) //nolint:errcheck // This will never fail
		},
	}))
	// app.Use(cache.New(cache.Config{
	// 	// CacheControl:         true,
	// 	Methods: []string{fiber.MethodGet, fiber.MethodPost, fiber.MethodHead},
	// 	// StoreResponseHeaders: true,
	// }))
	app.Use(cors.New(cors.Config{
		AllowOrigins:  "http://localhost:4000",
		AllowMethods:  "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		ExposeHeaders: "X-CSRF-Token", // 안먹힘
	}))
	app.Use(pprof.New())

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
	// app.Use(filesystem.New(filesystem.Config{
	// 	Root:   http.Dir("./"),
	// 	Browse: true,
	// }))
	app.Use(idempotency.New(idempotency.Config{
		Next: func(c *fiber.Ctx) bool {
			// Skip middleware if the request was done using a safe HTTP method
			fmt.Println(fiber.IsMethodSafe(c.Method()))
			fmt.Println(fiber.IsMethodIdempotent(c.Method()))
			return fiber.IsMethodSafe(c.Method())
		},
		Lifetime: 5 * time.Second,
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
		Next: func(c *fiber.Ctx) bool {
			return (c.Path() == "/expose/envvars" ||
				c.Path() == "/debug/vars" ||
				c.Path() == "/" ||
				c.Path() == "/me" ||
				c.Path() == "/debug/pprof")
		},
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

	// app.Use(csrf.New(csrf.Config{
	// 	CookieSameSite: "None",
	// 	CookieDomain:   "localhost:4000",
	// 	CookiePath:     "/",
	// 	Expiration:     1 * time.Second,
	// 	ContextKey:     "SERVER_CSRF_TOKEN",
	// }))

	app.Post("/13", func(c *fiber.Ctx) error {
		fmt.Println(c.Path())
		// return c.JSON(struct {
		// 	A string `json:"a"`
		// 	B string `json:"bb"`
		// }{
		// 	A: "hhhhh",
		// 	B: "eeeee",
		// })
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
	})

	// app.Use(limiter.New(limiter.Config{
	// Expiration: 60 * time.Second,
	// })) // prefork 방어안됨

	app.Post("/14", func(c *fiber.Ctx) error {
		time.Sleep(3 * time.Second)
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
	})

	app.Use("/expose/envvars", envvar.New())
	app.Use(expvar.New()) // --> /debug/vars

	// storage := sqlite3.New()
	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${status} - ${method} ${path}\n",
	}))

	app.Get("/me", monitor.New(monitor.Config{Title: "MyService Metrics Page"}))

	app.Post("/15", func(c *fiber.Ctx) error {
		panic("Oh My 15 Error")
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
	})

	app.Use(requestid.New())
	app.Use(skip.New(func(c *fiber.Ctx) error {
		return c.SendString("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
	}, func(ctx *fiber.Ctx) bool {
		fmt.Println("skip: ", ctx.Method() == fiber.MethodPost)
		return ctx.Method() == fiber.MethodGet ||
			ctx.Path() == "/17"
	}))
	app.Post("/16", func(c *fiber.Ctx) error {
		fmt.Printf("%+v\n", c.UserContext())
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
	})

	app.Post("/17", func(c *fiber.Ctx) error {
		// return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
		sleepTime, _ := time.ParseDuration("5000" + "ms")
		ctx, cancel := context.WithCancel(c.UserContext())
		go func(cont context.CancelFunc) {
			time.Sleep(3 * time.Second)
			cancel()
		}(cancel)
		if err := sleepWithContextWithCustomError(ctx, sleepTime); err != nil {
			return fmt.Errorf("%w: execution error", err)
		}
		return c.SendString(fmt.Sprintf("%d", time.Now().UnixNano()))
	})

	app.Listen(":5000")

}

func sleepWithContextWithCustomError(ctx context.Context, d time.Duration) error {
	var ErrFooTimeOut = errors.New("foo context canceled")
	var finish chan bool = make(chan bool)
	timer := time.NewTimer(d)
	go func(tmr *time.Timer, fish chan bool) {
		fmt.Println("확인용")
		fmt.Println("멈췄다")
		fmt.Println(<-timer.C)
		fmt.Println("풀렸다")
		fish <- true
	}(timer, finish)
	select {
	case <-ctx.Done():
		log.Println("완료")
		// log.Println("기달려")
		// <-timer.C
		// log.Println("끝")
		fmt.Println("곧 끝남(에러)")
		fmt.Println(<-finish)
		return ErrFooTimeOut
	case <-timer.C:
		log.Println("스킵")
	}
	fmt.Println("곧 끝남(정상)")
	fmt.Println(<-finish)
	return nil
}
