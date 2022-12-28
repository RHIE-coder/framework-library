package main

import (
	"fmt"
)

func main() {

	a := map[string]int {
		"hello" : 10,
		"world" : 20,
		"abcde" : 30,
	}

	value, isExist := a["none"]
	fmt.Println(value, isExist) // 0 false

	if value, isExist := a["hello"]; isExist {
		fmt.Println(value, isExist) // 10 true
	}
}
