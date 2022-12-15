// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Storage {
    uint number;

    event storeHistory(uint num);

    function store(uint256 num) public {
        number = num;
        emit storeHistory(num);
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}