// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract VolcanoCoin {
    uint256 public totalSupply;
    address owner;

    mapping(address => uint256) public balances;
    mapping(address => Payment[]) payments;
    
    struct Payment {
      address receipient;
      uint256 amount;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner,"You must be the owner"); 
        _; 
    }
   
    event supplyChanged(uint256);
    event Transfer(address indexed, address indexed, uint256);
   
   constructor() {
      totalSupply = 10000;
      owner = msg.sender;
      balances[msg.sender] = totalSupply;
   }
   
    function getBalance() public view returns (uint256) {
       return balances[msg.sender];
   }
   
   function updateTotalSupply() private onlyOwner {
      totalSupply = totalSupply + 1000;
      emit supplyChanged(totalSupply);
   }
   
   function transfer(address _recipient, uint256 _amount) public {
      require(balances[msg.sender] >= _amount,"Insufficient Balance");
      balances[msg.sender] -= _amount;
      balances[_recipient] += _amount;
      emit Transfer(msg.sender, _recipient, _amount);
      Payment memory payment;
      payment.receipient = _recipient;
      payment.amount = _amount;
      payments[msg.sender].push(payment);
   }
     
   function getPayments(address _user) public view returns (Payment[] memory) {
       return payments[_user];
   }
}