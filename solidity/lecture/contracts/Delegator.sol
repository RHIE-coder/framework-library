//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Delegator {

    IERC20 token;

    constructor(address _token) {
        token = IERC20(_token);
    }
/*  
    SENDER : 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    AMOUNT : 10
    [
        "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
        "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
        "0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7",
        "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
        "0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC",
        "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c"
    ]
*/
    
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