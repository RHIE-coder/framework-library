package main

import (
	"fmt"
	"runtime"
	"sync"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	mutex := new(sync.Mutex)
	cond := sync.NewCond(mutex)

	c := make(chan bool, 3)

	for i := 0; i < 3; i++ {
		go func(n int) {
			mutex.Lock()
			c <- true
			fmt.Println("wait begin: ", n)
			cond.Wait()
			fmt.Println("wait end: ", n)
			mutex.Unlock()
		}(i)
	}

	for i := 0; i < 3; i++ {
		fmt.Println("get channel value")
		<-c
	}

	mutex.Lock()
	fmt.Println("broadcast")
	cond.Broadcast()
	mutex.Unlock()

	fmt.Scanln()
}

/*
channel value input
wait begin:  2
channel value input
wait begin:  0
channel value input
wait begin:  1
broadcast
wait end:  2
wait end:  1
wait end:  0
*/
