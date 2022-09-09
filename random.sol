pragma solidity 0.8.16;

contract Random {
    uint256 private nonce; // = 0, affecté par défaut

    function random() public returns (uint256) {
        nonce++;
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
            ) % 100;
    }
}
