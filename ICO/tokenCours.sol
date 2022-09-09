pragma solidity 0.8.16;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract tokenCours is ERC20 {
    constructor(uint256 intialSupply) ERC20("COURS", "CRS") {
        _mint(msg.sender, initialSupply);
    }
}

// abstract contract tokenCours is ERC20 {}
