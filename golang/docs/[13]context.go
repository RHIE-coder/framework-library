package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	// 취소 가능한 Context 생성
	ctx, cancel := context.WithCancel(context.Background())
	ctx = context.WithValue(ctx, "cnt", 10)
	// 고루틴 실행
	go myGoroutine(ctx)

	// 5초 후 취소
	time.Sleep(5 * time.Second)
	fmt.Println("EOF")
	cancel()
	time.Sleep(1 * time.Second)
}

func myGoroutine(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("취소됨")
			return
		default:
			fmt.Println("계속 실행")
			v := ctx.Value("cnt").(int)
			fmt.Println(v)
			v++
			ctx = context.WithValue(ctx, "cnt", v)
			time.Sleep(1 * time.Second)
		}
	}
}
