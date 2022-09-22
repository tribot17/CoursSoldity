// Mauvais
pragma solidity ^0.4.4;
// Bon
pragma solidity 0.4.4;

contract visibility {
    // mauvais
    uint256 x; //la valeur par défaut est interne pour les variables d'état, mais elle doit être rendue explicite

    function buy() {
        // par défaut public
        // public code
    }

    // bon
    uint256 private y;

    function buy() external {
        // appelable uniquement en externe ou en utilisant this.buy()
    }

    function utility() public {
        // appelable en externe comme en interne : changer ce code nécessite de réfléchir aux deux cas.
    }

    function internalAction() internal {
        // internal code
    }
}
