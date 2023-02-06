package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	var data = []int{}

	go func() {
		for i := 0; i < 1000; i++ {
			data = append(data, 1)

			runtime.Gosched() // 다른 고루틴이 CPU를 사용할 수 있도록 양보
		}
	}()

	go func() {
		for i := 0; i < 1000; i++ {
			data = append(data, 1)

			runtime.Gosched()
		}
	}()

	time.Sleep(2 * time.Second)
	fmt.Println(len(data))
}
