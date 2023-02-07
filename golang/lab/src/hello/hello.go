package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	var mutex = new(sync.Mutex)
	var cond = sync.NewCond(mutex)

	c := make(chan bool, 3)

	for i := 0; i < 3; i++ {
		go func(n int) {
			mutex.Lock()
			c <- true
			fmt.Println("wait begin : ", n)
			cond.Wait()
			fmt.Println("wait end : ", n)
			mutex.Unlock()
		}(i)
	}

	for i := 0; i < 3; i++ {
		fmt.Println("read channel before")
		fmt.Println(<-c) // 채널에서 값을 꺼냄, 고루틴 3개가 모두 실행될 때까지 기다림
		fmt.Println("read channel after")
	}

	for i := 0; i < 3; i++ {
		mutex.Lock()
		fmt.Println("signal : ", i)
		cond.Signal()
		mutex.Unlock()
	}

	fmt.Scanln()
}
