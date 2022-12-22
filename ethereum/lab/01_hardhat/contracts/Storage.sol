// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Storage {
    uint number;

    event storeHistory(uint indexed num, string data);

    function store(uint256 num, string memory message) public {
        number = num;
        emit storeHistory(num, message);
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}