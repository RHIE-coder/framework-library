# --- Hello World ---

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

# --- Outline ---

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

## [ Unit Test ]

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

<br><br><br>

# --- GO 환경 ---

## [ GOROOT ]

The Go binary distributions assume they will be installed in `/usr/local/go` (or `c:\Go` under Windows), but it is possible to install the Go tools to a different location. In this case you must set the `GOROOT` environment variable to point to the directory in which it was installed.

For example, if you installed Go to your home directory you should add the following commands to `$HOME/.profile`:

```sh
export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin
```

Note: `GOROOT` must be set only when installing to a custom location.

## [ GOPATH ]

1.16 버전부터 GOPATH가 먹히지 않는다. 

모듈이 기본 옵션이 되어(`GO111MODULE`이 on), `GO111MODULE` 환경변수를 auto나 off로 하면 `GOPATH`를 사용할 수 있다. 

1.17부터 모듈만 지원할 계획이었으나, go.mod가 있으면 모듈 없으면 gopath를 사용한다. 

어쨌든 `GOPATH`와 non-modular 구조는 deprecated이므로 모듈 구조를 사용하는 것이 권장된다.

  1. 1.11 버전부터 의존성 관리, 패키지 관리 기능이 추가되었다.
  2. 1.16 버전부터 go.mod를 GOPATH 대신 디폴트로 사용하도록 한다.
  3. 현재까지는 go.mod와 GOPATH를 사용하는 방식을 옵션 설정을 통해 모두 이용 가능하지만, go.mod가 권장된다.


### - 변수 변경

```sh
go env -w GO111MODULE=auto
```

#### > 설정 값 
 - on   : 빌드 중에 $GOPATH에 있는 패키지를 사용(default)
 - off  : 빌드 중에 $GOPATH 대신 모듈에 있는 패키지를 사용
 - auto : 현재 디렉토리가 $GOPATH 외부에 있고 go.mod 파일이 포함된 경우 모듈을 사용하고 그렇지 않으면 $GOPATH의 패키지를 사용

<br><br><br>

# --- GO 모듈 ---

## [Commands]

 - go mod init [module-name]: 모듈 초기화. 보통 `github.com/who/module` 포맷.
 - go get [module-name]: 모듈 다운로드
 - go mod tidy: 소스코드 확인 후 import되지 않는 모듈들을 자동으로 go.mod에서 삭제, import 되었지만 실제 모듈이 다운안된 경우는 go.mod 파일에 추가
 - go mod vendor: Module을 이용하면 module들은 project 밑에 저장하지 않고 GOPATH에 저장함.

### -모듈 저장 위치를 나타내는 환경변수

`GOMODCACHE`
