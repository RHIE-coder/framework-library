// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Callee.sol";

contract Caller {

    address public sender;
    uint public value;

    /* Caller: LOG(EOA), NOT UPDATED --> Callee: LOG(Caller Address), UPDATED */
    event CallerLog(address sender, uint value, string data);

    function setVars(address _contract, uint _value) external{

        string memory data = Callee(_contract).setVars(_value);

        emit CallerLog(msg.sender, _value, data); //data="Hello World"
    }
}