// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Callee.sol";

contract DelegateCaller {

    address public sender;
    uint public value;

    event DelegateCallerLog(address sender, uint value, bytes data);

    /* DelegateCaller: LOG(EOA), UPDATED --> Callee: LOG(EOA), NOT UPDATED*/
    function setVars(address _contract, uint _value) external {
        /*
            _contract.delegateCall(
                abi.encodeWithSignature("setVars(uint256)", _value)
            );
        */
        (bool success, bytes memory data) = _contract.delegatecall(
            abi.encodeWithSelector(Callee.setVars.selector, _value)
        );

        require(success, "delegate call fail");

        emit DelegateCallerLog(msg.sender, _value, data); //data="Hello World"
    }
}