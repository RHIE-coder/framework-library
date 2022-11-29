// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/SimpleMath.sol";

contract Storage {
    uint public numData;

    function setNumData(uint _numData) public {
        numData = _numData;
    }

    function getNumData() public view returns(uint){
        return numData;
    }

    function calculate() public view returns(uint){
        return SimpleMath.plusTen(numData);
    }
    
}