package hello

import (
	"fmt"

	"github.com/rhie-coder/goproj/hello/section"
)

func Deposit() {
	fmt.Println("=================")
	fmt.Println("get money")
	Sing()
	section.Yprint()
	section.Xprint()
	fmt.Println("=================")
}
