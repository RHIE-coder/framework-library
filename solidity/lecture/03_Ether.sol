// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
/*  
    트랜젝션 비용
    gas spent * gas price
    
     - Unspent gas will be refunded.

    GAS LIMIT
     - gas limit (max amount of gas you're willing to use for your transaction, set by you)
     - block gas limit (max amount of gas allowed in a block, set by the network)
    
    
*/
contract EtherUnits {
    uint public oneWei = 1 wei;
    // 1 wei is equal to 1
    bool public isOneWei = 1 wei == 1;

    uint public oneEther = 1 ether;
    // 1 ether is equal to 10^18 wei
    bool public isOneEther = 1 ether == 1e18;
}