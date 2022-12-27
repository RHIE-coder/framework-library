package greetings

import (
	"testing"
)

func TestHelloName(t *testing.T) {
	name := "rhie-coder"
	msg, err := Hello(name);

	if msg != "Hi, rhie-coder. Welcome!" || err != nil {
		t.Error("unmatched message")
	}
}

func TestEmpty(t *testing.T) {
	msg, err := Hello("")
	
	if msg != "" || err == nil {
		t.Fatal("empty name is not allowed")
	}
}