pragma solidity 0.8.16;

import "./tokenCours.sol";

contract Crowdsale {
    uint256 public rate = 200;
    tokenCours public token;

    constructor(uint256 _intialSupply) {
        token = new tokenCours(_intialSupply);
    }

    receive() external payable {
        require(msg.value >= 0.1 ether, "You can't send less than 0.1 ether");
        distribute(msg.value);
    }

    function distribute(uint256 _amount) internal {
        uint256 tokenToSent = _amount * rate;
        token.transfer(msg.sender, tokenToSent);
    }
}
