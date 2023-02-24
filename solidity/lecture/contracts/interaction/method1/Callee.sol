// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Callee {

    address public sender;
    uint public value;

    event CalleeLog(address sender, uint value);

    function setVars(uint _value) external returns(string memory){
        value = _value;
        sender = msg.sender;

        emit CalleeLog(sender, value);

        return "Hello World";
    }
}