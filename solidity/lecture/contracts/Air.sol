// SPDX-License-Identifier: GNU Affero General Public License v3.0
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts@4.8.0/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; 

contract TokensAirdrop {
    string public _version = "0.0.2";

    IERC20 _erc20Token;
    mapping(address=>bool) _permissions;

    constructor (IERC20 token, address[] memory permissionList) {
        _erc20Token = token;

        _permissions[msg.sender] = true;

        uint len = permissionList.length;

        for (uint i = 0; i < len;) {
            _permissions[permissionList[i]] = true;

            unchecked{
                ++i;
            }
        }
    }

    modifier onlyPermissionedAddress() {
        require(_permissions[msg.sender], "invalid permission");
        _;
    }

    /*******************************************************************************************
    *   Written by solidity
    *   - airdrop : N receivers M amounts ( N == M )
    *   - airdropFixedAmount : N receivers 1 amounts ( N : 1 )
    *
    *   @function   airdrop(address[] recipients, uint256[] amounts)
    *   @function   airdropFixedAmount(address[] recipients, uint256 amount)
    *
    *___________________________________________________________________________________________
    *
    *   Written by inline assembly
    *   - assembly_Airdrop : N receivers M amounts ( N == M )
    *   - assembly_AirdropFixedAmount : N receivers 1 amounts ( N : 1 )
    *
    *   @function   assembly_Airdrop(address[] recipients, uint256[] amounts)
    *   @function   assembly_AirdropFixedAmount(address[] recipients, uint256 amount)
    *
    *******************************************************************************************/
    function airdrop(address[] calldata recipients, uint256[] calldata amounts) public onlyPermissionedAddress{
        uint256 len = recipients.length;
        require(len >= 0, "recipients list is empty");
        require(len == amounts.length, "length of recipients list and amount list should be equal");

        IERC20 token = _erc20Token;

        for (uint256 i = 0; i < len;) {
            token.transferFrom(msg.sender, recipients[i], amounts[i]);
            unchecked {
                ++i;
            }
        }
    }

    function airdropFixedAmount(address[] calldata recipients, uint256 amount) public onlyPermissionedAddress{
        uint256 len = recipients.length;
        require(len >= 0, "recipients list is empty");
        require(amount > 0, "amount shouild not be zero");

        IERC20 token = _erc20Token;

        for (uint256 i = 0; i < len;) {
            token.transferFrom(msg.sender, recipients[i], amount);
            unchecked {
                ++i;
            }
        }
    }

    /*******************************************************************************************
    *
    *   above : solidity
    *   below : inline assembly
    *    
    *******************************************************************************************/
    function assembly_Airdrop(address[] calldata recipients, uint256[] calldata amounts) public onlyPermissionedAddress{
        uint256 len = recipients.length;
        require(len >= 0, "recipients list is empty");

        IERC20 token = _erc20Token;
        bytes4 fnSig = bytes4(keccak256("transferFrom(address,address,uint256)"));

        assembly {
            for { let i := 0 }
                lt(i, len)
                { i := add(i, 1) }
            {
                let recipient := calldataload(add(recipients.offset, mul(i, 0x20)))
                let amount := calldataload(add(amounts.offset, mul(i, 0x20)))
                let params := mload(0x40)
                mstore(0x40, add(params, 0x64))
                mstore(params, fnSig)
                mstore(add(params, 0x4), caller())
                mstore(add(params, 0x24), recipient)
                mstore(add(params, 0x44), amount)

                let result := call(gas(), token, 0, params, 0x64, 0, 0)
                if eq(result, 0) {
                    revert(0, returndatasize())
                }
            }
        }
    }
    
    function assembly_AirdropFixedAmount(address[] calldata recipients, uint256 amount) public onlyPermissionedAddress{
        uint256 len = recipients.length;
        require(len >= 0, "recipients list is empty");

        IERC20 token = _erc20Token;
        bytes4 fnSig = bytes4(keccak256("transferFrom(address,address,uint256)"));

        assembly {
            for { let i := 0 }
                lt(i, len)
                { i := add(i, 1) }
            {
                let recipient := calldataload(add(recipients.offset, mul(i, 0x20)))
                let params := mload(0x40)
                mstore(0x40, add(params, 0x64))
                mstore(params, fnSig)
                mstore(add(params, 0x4), caller())
                mstore(add(params, 0x24), recipient)
                mstore(add(params, 0x44), amount)

                let result := call(gas(), token, 0, params, 0x64, 0, 0)
                if eq(result, 0) {
                    revert(0, returndatasize())
                }
            }
        }
    }

    
    function assembly_AirdropFixedAmountSend(address sender, address[] calldata recipients, uint256 amount) public onlyPermissionedAddress{
        uint256 len = recipients.length;
        require(len >= 0, "recipients list is empty");

        IERC20 token = _erc20Token;
        bytes4 fnSig = bytes4(keccak256("transferFrom(address,address,uint256)"));

        assembly {
            for { let i := 0 }
                lt(i, len)
                { i := add(i, 1) }
            {
                let recipient := calldataload(add(recipients.offset, mul(i, 0x20)))
                let params := mload(0x40)
                mstore(0x40, add(params, 0x64))
                mstore(params, fnSig)
                mstore(add(params, 0x4), caller())
                mstore(add(params, 0x24), sender)
                mstore(add(params, 0x44), recipient)
                mstore(add(params, 0x64), amount)

                let result := call(gas(), token, 0, params, 0x64, 0, 0)
                if eq(result, 0) {
                    revert(0, returndatasize())
                }
            }
        }
    }

    
}