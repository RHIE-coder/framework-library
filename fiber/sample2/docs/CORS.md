# CORS

https://pkg.go.dev/github.com/gofiber/fiber/v2@v2.42.0/middleware/cors

https://developer.mozilla.org/ko/docs/Web/HTTP/CORS

```go
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:4000",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
```

## Request Header

```
Origin: http://localhost:4000
```

## Response Header

```
Access-Control-Allow-Origin: http://localhost:4000
Vary: Origin
```