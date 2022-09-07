pragma solidity 0.8.16;

contract whiteList {
    address owner;
    mapping(address => bool) whitelist;

    event Authurized(address _address);

    event UnAuthurized(address _address);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner"
        );
        _;
    }

    function Authorize(address _address) public onlyOwner{
        whitelist[_address] = true;
        emit Authurized(_address);
    }

    function UnAuthorize(address _address) public onlyOwner{
        whitelist[_address] = false;
        emit UnAuthurized(_address);
    }

    function myFunction(address _address) public{
        require(whitelist[msg.sender] == true, "You are not in the whitelsit");
    }

}