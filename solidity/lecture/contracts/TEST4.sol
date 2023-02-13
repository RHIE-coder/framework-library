//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LikeERC20Token {
    mapping(address=>uint) public balances;

    event Received(address from, address to, uint amount);
    event Minted(address to, uint amount);

    function transfer(address _to, uint _amount) public {
        address _sender = msg.sender;
        require(balances[_sender] >= _amount, "sender amount is not enough");

        balances[_sender] -= _amount;
        balances[_to] += _amount;

        emit Received(_sender, _to, _amount);
    }

    function mint(address _to, uint _amount) public {
        balances[_to] += _amount;

        emit Minted(_to, _amount);
    }
}

contract Delegator {
    LikeERC20Token token;

    constructor(address _token) {
        token = LikeERC20Token(_token);
    }

    function callTransfer(address _to, uint _amount) public {
        token.transfer(_to, _amount);
    }
}