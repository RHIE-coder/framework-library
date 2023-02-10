// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*  
    local: 함수 안에 정의되며 블록체인에 저장되지 않음
    state: 함수 밖에 정의되며 블록체인에 저장됨
    global: 블록체인에서 제공하는 변수들

    constant 상수, 선언과 동시에 값을 할당.
    immutable 상수, 미리 선언하고 나중에 값을 할당할 수 있음.

    mapping: key-value format
    array: (ex)uint[] public arr;

    Enums: can be declared outside of a contract.
    Structs: can be declared outside of a contract and imported in another contract.

    storage: 블록체인에 저장된 state 변수
    memory: 함수가 불려지는 동안 메모리에 존재하는 변수(Mutable)
    calldata: call data, 인자들이 포함된 데이터 공간(Immutable)
*/

contract Variables {

    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    struct Todo {
        string text;
        bool completed;
    }

    Todo[] public todos;

    function howToUseStruct(string calldata _text) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        todos.push(Todo(_text, false));

        // key value mapping
        todos.push(Todo({text: _text, completed: false}));

        // initialize an empty struct and then update it
        Todo memory todo;
        todo.text = _text;
        // todo.completed initialized to false

        todos.push(todo);

        Todo[] memory arr;

        arr.push(Todo(_text, true));
    }

    uint[] public arr;

    function setArray(uint[] memory newArr) public {
        arr = newArr;
    }

    function getArray() public view returns(uint[] memory) {
        return arr;
    }
}