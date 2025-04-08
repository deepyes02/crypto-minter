// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "VEDANTA";
    string public version = "1.0-test";
    string public symbol = "SRI";
    // fixed amount of tokens stored i an unsigned integer type variable
    uint8 public decimals = 3;
    uint256 public totalSupply = 33_33_33_000 * 10 ** uint256(decimals);

    address public owner;

    mapping(address => uint256) public balances;

    // Transfer event
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
