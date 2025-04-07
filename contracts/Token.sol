// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
  string public name = "VEDANTA";
  string public symbol = "SRI";
  // fixed amount of tokens stored i an unsigned integer type variable
  uint256 public totalSupply = 500;

  address public owner;

  mapping(address => uint256) public balances;

  // Transfer event
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  constructor(){
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