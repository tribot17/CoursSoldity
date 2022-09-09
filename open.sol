pragma solidity 0.8.16;

contract open {
    enum State {
        attente,
        ouverte,
        ferme
    }

    State state = State.attente;

    function ToOpen() public {
        state = State.ouverte;
    }

    function ToClose() public {
        state = State.ferme;
    }
}
