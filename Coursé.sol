pragma solidity "0.8.16";

// import "./Cours.sol";

contract myContract {
    // uint256 myUint = -245;
    bytes myByte = "Salut";
    mapping(address => bool) myMapping;

    enum myEnum {
        state1,
        state2
    }

    myEnum myenum;

    function myFunction(string memory _myString) public {
        _myString = "salut";
    }

    function transfer(address _address) public {
        myMapping[_address] = false;
    }

    // function myFunction2(string calldata _myString) public {
    //     _myString = "salut";
    // }
}
