pragma solidity 0.8.16;

contract myContract {
    //code

    uint256 maVariable;

    function myFunction(uint256 _amount) public {}
}

contract Storage {
    function myFunction(string memory _myString) public {
        _myString = "salut";
    }

    function myFunction2(string calldata _myString) public {
        _myString = "salut";
    }

    // function myFunction3(string storage _myString) public {
    //     _myString = "salut";
    // }
}

contract Types {
    // uint256 number = -520;
    bytes myBytes = "salut";

    enum myEnum {
        state1,
        state2,
        state3
    }

    myEnum myenum;

    function setState() public {
        myenum = myEnum.state2;
    }
}

contract Struc {
    struct myStruct {
        uint256 myInt;
        bool myBool;
    }

    function addPerson(string memory _name, uint256 _int) public {
        myStruct memory mystruct;
        //   myStruct.myInt = ;
        mystruct.myInt = _int;
    }

    // mapping(uint256 => myStruct) myMapping;
}

contract Whitelist {
    struct Person {
        // Structure de données
        string name;
        uint256 age;
    }
    Person[] public persons;

    function add(string memory _name, uint256 _age) public {
        Person memory person = Person(_name, _age); // création d'un nouveau objet
        persons.push(person); // Ajout de l'objet "Person" dans le tableau
    }

    function remove() public {
        persons.pop(); // Suppression du dernier objet du tableau
    }
}

contract Whitelist2 {
    mapping(address => bool) whitelist;
    event Authorized(address _address); // Event

    function authorize(address _address) public {
        whitelist[_address] = true;
        emit Authorized(_address); // Triggering event
    }
}

contract HelloWorld {
    string myString = "Hello World !";

    function hello() public view returns (string memory) {
        return myString;
    }
}

contract Time {
    function getTime() public view returns (uint256) {
        return block.timestamp;
    }
}
