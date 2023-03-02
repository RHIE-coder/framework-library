package main

import (
	"fmt"
	"reflect"
	"sync"
)

type Data struct {
	buffer []int
	status string
}

func main() {
	pool := sync.Pool{
		New: func() interface{} {
			data := new(Data)
			data.status = "pending"
			data.buffer = []int{1, 2, 3, 4, 5}
			return data
		},
	}

	// data := pool.Get().(*Data)
	data := pool.Get()
	fmt.Println(reflect.TypeOf(data))
	fmt.Println(data)
}
