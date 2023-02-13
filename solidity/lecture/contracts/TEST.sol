// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


/*  
    재밌는 사실?
     - a와 b의 gas fee는 이상하게 다르다
     - total state 변수를 초기화하지 않거나 0으로 초기화하면 처음 돌릴 때 예상보다 더 많은 가스비가 든다
     - 그러나 1로 초기화하면 가스비가 예상대로 소비된다
*/
contract TEST {

    uint total = 1;

    function a() public {
        for (uint i = 1; i <= 10; ++i) {
            total += i;
        }
    }

    function b() public {
        for (uint i = 1; i <= 10; ++i) {
            total += i;
        }
    }
}