// Bank.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Bank {
    mapping(address => uint256) private _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }

    function transfer(address _recipient, uint256 _amount) public {
        require(
            _recipient != address(0),
            "You cannot transfer to the address zero"
        );
        require(
            _balances[msg.sender] >= _amount,
            "You have not enough balance"
        );
        payable(_recipient).transfer(_amount);
        _balances[_recipient] += _amount;
        _balances[msg.sender] -= _amount;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return _balances[_address];
    }

    //Receive
    receive() external payable {
        _balances[msg.sender] += msg.value;
    }
}
