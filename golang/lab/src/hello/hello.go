package main

import "fmt"

type Rectangle struct {
	width  int
	height int
}

func scaleOut(rect *Rectangle) {
	rect.width *= 10
	rect.height *= 10
}
func main() {
	rect := Rectangle{2, 3}
	rectPtr := &Rectangle{2, 3}
	fmt.Println(rect)
	fmt.Println(rectPtr)
	scaleOut(&rect)
	scaleOut(rectPtr)
	fmt.Println(rect)
	fmt.Println(rectPtr)
}

/*
{2 3}
&{2 3}
{20 30}
&{20 30}
*/
