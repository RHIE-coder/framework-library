// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {

    event log(string msg);

    receive() external payable {
        emit log("receive function is invoked");
    }

    fallback() external payable {
        emit log("fallback function is invoked");
    }

    function thePayableFunction() public payable returns(string memory){
        return "the payable function is called";
    }

    function notPayalbeFunction() public pure returns(string memory) {
        return "not payable function is called";
    }
    
    function foo() public pure returns(string memory) {
        return "bar";
    }

    function getCalldata() public payable returns(bytes memory) {
        return abi.encodeWithSignature("foo()");
    }

}