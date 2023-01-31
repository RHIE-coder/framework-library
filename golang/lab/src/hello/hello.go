package main

import (
	"fmt"
)

const (
	_ = iota + 20000
	OOPS
	E
	F
)

func main() {
	fmt.Println(OOPS)
}
