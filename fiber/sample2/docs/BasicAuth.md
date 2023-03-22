# BasicAuth

BASIC AUTH RFC 명세에 따라 인가 진행

https://www.rfc-editor.org/rfc/rfc7617

https://pkg.go.dev/github.com/gofiber/fiber/v2@v2.42.0/middleware/basicauth#section-readme

 - 내부 로직

```go
func New(config Config) fiber.Handler {
	// Set default config
	cfg := configDefault(config)

	// Return new handler
	return func(c *fiber.Ctx) error {
		// Don't execute middleware if Next returns true
		if cfg.Next != nil && cfg.Next(c) {
			return c.Next()
		}

		// Get authorization header
		auth := c.Get(fiber.HeaderAuthorization)

		// Check if the header contains content besides "basic".
		if len(auth) <= 6 || strings.ToLower(auth[:5]) != "basic" {
			return cfg.Unauthorized(c)
		}

		// Decode the header contents
		raw, err := base64.StdEncoding.DecodeString(auth[6:])
		if err != nil {
			return cfg.Unauthorized(c)
		}

		// Get the credentials
		creds := utils.UnsafeString(raw)

		// Check if the credentials are in the correct form
		// which is "username:password".
		index := strings.Index(creds, ":")
		if index == -1 {
			return cfg.Unauthorized(c)
		}

		// Get the username and password
		username := creds[:index]
		password := creds[index+1:]

		if cfg.Authorizer(username, password) {
			c.Locals(cfg.ContextUsername, username)
			c.Locals(cfg.ContextPassword, password)
			return c.Next()
		}

		// Authentication failed
		return cfg.Unauthorized(c)
	}
```

 - Config 

```go
var ConfigDefault = Config{
	Next:            nil,
	Users:           map[string]string{},
	Realm:           "Restricted",
	Authorizer:      nil,
	Unauthorized:    nil,
	ContextUsername: "username",
	ContextPassword: "password",
}
```