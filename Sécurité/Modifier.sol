pragma solidity 0.8.17;

contract Registry {
    address owner;

    function isVoter(address _addr) external returns (bool) {
        // Code
    }
}

contract Election {
    Registry registry;

    modifier isEligible(address _addr) {
        require(registry.isVoter(_addr));
        _;
    }

    function vote() public isEligible(msg.sender) {
        // Code
    }
}
