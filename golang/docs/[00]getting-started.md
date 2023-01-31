# Hello World

```sh
$ go mod init example/hello
```

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

```sh
$ go run .
Hello, World!
```
<br><br><br>

# Outline

```sh
$ mkdir greetings
$ cd greetings
$ go mod init example.com/greetings
```
 - `greetings/greetings.go`

```go
package greetings

import (
	"errors"
	"fmt"
)

func Hello(name string) (string, error) {
	// If no name was given, retrun an error with a message.
	if name == "" {
		return "", errors.New("empty name")
	}

	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message, nil
}
```

```sh
$ mkdir hello
$ cd hello
$ go mod example.com/hello
```

 - `hello/hello.go`

```go
package main

import (
	"fmt"
	"log"

	"example.com/greetings"
)

func main() {
	// Set properties of the predefined Logger,
	// including the log entry prefix and a flag
	// to disable printing the time, source file, and line number
	log.SetPrefix("greetings: ")
	log.SetFlags(0)

    -----------
    message, err := greetings.Hello("rhie-coder")

    --- OR ---

	message, err := greetings.Hello("")
    -----------

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(message)
}
```

```sh
$ go mod edit --replace example.com/greeting=../greetings
$ go mod tidy # add missing and remove unused modules
$ go run .
```

##### OUTPUT

```
Hi, rhie-coder. Welcome!

### OR ###

greetings: empty name
exit status 1
```

## # Unit Test

 - `greetings/greetings_test.go`

```go
package greetings

import (
	"testing"
)

func TestHelloName(t *testing.T) {
	name := "rhie-coder"
	msg, err := Hello(name);

	if msg != "Hi, rhie-coder. Welcome!" || err != nil {
		t.Error("unmatched message")
	}
}

func TestEmpty(t *testing.T) {
	msg, err := Hello("")
	
	if msg != "" || err == nil {
		t.Fatal("empty name is not allowed")
	}
}
```

##### OUTPUT
```
$ go test

PASS
ok      example.com/greetings   0.002s
```

```
$ go test -v

=== RUN   TestHelloName
--- PASS: TestHelloName (0.00s)
=== RUN   TestEmpty
--- PASS: TestEmpty (0.00s)
PASS
ok      example.com/greetings   0.001s
```