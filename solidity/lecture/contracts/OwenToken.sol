//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwenToken is ERC20 {
    constructor() ERC20("ANSA", "ANSA") {
        _mint(msg.sender, 900000000000000000);
    }
}