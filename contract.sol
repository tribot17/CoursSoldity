pragma solidity 0.8.16;


contract WhiteList {
    struct myStuct{
        uint age;
        string name;
    }

    mapping(address => bool) whitelist;

    event Authorized(address _address);

    myStuct[] public monArray;

    function addPersonne(string memory _name, uint8 _age)  public returns(myStuct memory) {
        myStuct memory mytruct;
        mytruct.name = _name;
        mytruct.age = _age;
        monArray.push(mytruct);
    }

    function remove() public {
        monArray.pop();
    }



}