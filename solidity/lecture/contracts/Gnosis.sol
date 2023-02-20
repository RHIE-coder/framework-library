//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Delegator {

    constructor(address _token) {
        token = IERC20(_token);
    }
    function singleTransferFrom(address _from, address _to, uint _amount) public {
        /*  
            [ERC20 Token - transferFrom 직접 호출]
                ------- First Call
                gas             	69341 gas
                transaction cost	60296 gas 
                execution cost	    38356 gas
                -------- After
                gas                	49676 gas
                transaction cost	43196 gas 
                execution cost	    21256 gas

            [Delegator - transferFrom 직접 호출]
                gas	                57145 gas
                transaction cost	49691 gas 
                execution cost	    27751 gas
        */
        token.transferFrom(_from, _to, _amount);
    }

    function bulkTransferFromStep1(address _from, address[] memory _receivers, uint _amount) public {
        /*  
            gas	                337103 gas
            transaction cost	293133 gas 
            execution cost	    267601 gas
        */
        /*  
            gas	                199448 gas
            transaction cost	173433 gas 
            execution cost	    147901 gas 
        */
        for(uint i = 0; i < _receivers.length; ++i) {
            token.transferFrom(_from, _receivers[i], _amount);
        }
    }

    // 1. Data Location 수정: memory -> calldata
    function bulkTransferFromStep2(address _from, address[] calldata _receivers, uint _amount) public {
        /*  
            gas	                199252 gas
            transaction cost	173262 gas 
            execution cost	    147742 gas
        */
        for(uint i = 0; i < _receivers.length; ++i) {
            token.transferFrom(_from, _receivers[i], _amount);
        }
    }

    // 1. Data Location 수정: memory -> calldata
    // 2. load state variables to memory
    function bulkTransferFromStep3(address _from, address[] calldata _receivers, uint _amount) public {
        /*  
            gas	                197933 gas
            transaction cost	172115 gas 
            execution cost  	146583 gas
        */
        IERC20 _token = token;
        for(uint i = 0; i < _receivers.length; ++i) {
            _token.transferFrom(_from, _receivers[i], _amount);
        }
    }

    // 1. Data Location 수정: memory -> calldata
    // 2. load state variables to memory
    // 3. Caching
    function bulkTransferFromStep4(address _from, address[] calldata _receivers, uint _amount) public {
        /*  
            gas	                197905 gas
            transaction cost	172091 gas 
            execution cost	    146559 gas
        */
        IERC20 _token = token;
        uint len = _receivers.length;

        for(uint i = 0; i < len; ++i) {
            _token.transferFrom(_from, _receivers[i], _amount);
        }
    }

    // 1. Data Location 수정: memory -> calldata
    // 2. load state variables to memory
    // 3. Caching
    // 4. Uncheck i overflow/underflow
    function bulkTransferFromStep5(address _from, address[] calldata _receivers, uint _amount) public {
        /*  
            gas	                196449 gas  199448
            transaction cost	170825 gas  173433
            execution cost	    145293 gas  147901
        */
        IERC20 _token = token;
        uint len = _receivers.length;

        for(uint i = 0; i < len; ) {
            _token.transferFrom(_from, _receivers[i], _amount);
            
            unchecked {
                ++i;
            }
        }
    }

    // 5. Assembly Code
    function bulkTransferFromStep6(address _from, address[] calldata _receivers, uint _amount) public {
        /*  
             - execution cost: 
        */
        revert("not yet implements");
    }
}