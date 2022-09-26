pragma solidity 0.8.16;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(uint256 _initialSupply) ERC20("COURS", "CRS") {
        _mint(msg.sender, _initialSupply);
    }
}
