package main

import "fmt"

func main() {

	var total int

	result := func(nums ...int) {
		for _, num := range nums {
			total += num
		}
		fmt.Println(total)
	}()
}
