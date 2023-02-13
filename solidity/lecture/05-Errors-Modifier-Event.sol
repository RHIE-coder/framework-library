// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*  
    require(조건식, "에러 메시지")
    revert("에러 메시지")
    assert(조건식) //should only be used to test for internal errors, and to check invariants.
*/
contract Errors {
    // custom error
    error InsufficientBalance(uint balance, uint withdrawAmount);

    function testCustomError(uint _withdrawAmount) public view {
        uint bal = address(this).balance;
        if (bal < _withdrawAmount) {
            revert InsufficientBalance({balance: bal, withdrawAmount: _withdrawAmount});
        }
    }
}
contract TEST {

    uint total;

    /*  
        transaction cost	49323 gas 
        execution cost	    28259 gas
    */
    function revertError() public returns(bool) {
        
        for(uint i = 0; i < 10; ++i) {
            total += i;
        }
        revert("revert error msg");
        // return true;
    }


    /*  
        transaction cost	49301 gas 
        execution cost  	28237 gas
    */
    function requireError() public returns(bool) {
        
        for(uint i = 0; i < 10; ++i) {
            total += i;
        }
        require(10 < 9, "require error msg");
        return true;
    }

    /*  
        transaction cost	49063 gas 
        execution cost  	27999 gas 
    */
    function assertError() public returns(bool) {
        
        for(uint i = 0; i < 10; ++i) {
            total += i;
        }
        assert(10 < 9);
        return true;
    }

}

