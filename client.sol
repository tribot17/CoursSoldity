pragma solidity 0.8.16;

contract Client {
    struct clientData {
        uint256 age;
        string nom;
        string prenom;
    }

    mapping(address => clientData) client;

    function addClient(
        uint256 _age,
        string memory _nom,
        string memory _prenom
    ) public {
        client[msg.sender].age = _age;
        client[msg.sender].nom = _nom;
        client[msg.sender].prenom = _prenom;
    }
}
