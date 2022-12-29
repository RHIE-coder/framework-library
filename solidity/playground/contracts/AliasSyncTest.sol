// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts@4.8.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.0/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.0/utils/Counters.sol";

contract Test {
    mapping(string => uint256) numberStore;

    function getNumberByString(string memory indexString) view public returns(uint256) {
        return numberStore[indexString];
    }
}