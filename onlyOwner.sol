pragma solidity 0.8.16;

contract onlyOwner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function helloWorld() public view isOwner returns (string memory) {
        return "Hello World";
    }
}
