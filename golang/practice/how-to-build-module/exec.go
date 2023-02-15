package main

import (
	"fmt"

	"github.com/rhie-coder/goproj/greetings"
	"github.com/rhie-coder/goproj/hello"
	"github.com/rhie-coder/goproj/hello/section"

	zed "rhie/mondo"
	"rhie/mondo/bar"
)

func main() {
	fmt.Println("root hello")
	hello.Sing()
	hello.Deposit()
	greetings.Hello()
	section.Xprint()
	section.Yprint()
	zed.Add(10, 20)
	bar.Mul(10, 20)
}
