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
*/

contract Variables {
    uint[] public arr;

    function setArray(uint[] memory newArr) public {
        arr = newArr;
    }

    function getArray() public view returns(uint[] memory) {
        return arr;
    }
}