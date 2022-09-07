pragma solidity 0.8.16;

contract time {
    function getTime() public view returns(uint){
        return block.timestamp;
    }
}

contract msgSender{
    mapping(address => uint) public choices;

    function add(uint _myUint) public {
        choices[msg.sender] = _myUint;
    }
}