pragma solidity 0.8.17;

contract opti {
    // bad
    uint128 a;
    uint256 b;
    uint128 c;

    //good
    uint128 a2;
    uint128 c2;
    uint256 b2;

    uint256 hello = 0; //bad, chère
    uint256 world; //good, pas chère

    require(balance >= amount, "Insufficient balance"); //good
    require(balance >= amount, "To whomsoever it may concern. I am writing this error message to let you know that the amount you are trying to transfer is unfortunately more than your current balance. Perhaps you made a typo or you are just trying to be a hacker boi. In any case, this transaction is going to revert. Please try again with a lower amount. Warm regards, EVM"; //bad

    require(balance >= amount);//ce contrôle est redondant car Solidity vérifie les underflow et overflow de manière native.
    balance = balance - amount;

    (balance, amount) = (amount, balance);

    // bad
    struct Personne {
        string Nom;
        uint8 Age;
        address Adresse;
        uint8 Poids;
    }
    // good
    struct Personne2 {
        string Nom;
        uint8 Age;
        uint8 Poids;
        address Adresse;
    }


    uint256 retur = 5; // assume 2 decimal places
    uint256 totalReturn;
    function updateTotalReturn(uint256 timesteps) external {
    uint256 r = totalReturn || 1;
    for (uint256 i = 0; i < timesteps; i++) {
    r = r * retur;
    }
    totalReturn = r;
    }
}
