contract Wallet {
    mapping(address => uint256) balances;

    event LogBadCall(address user);
    event LogDepot(address user, uint256 quantity);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit LogDepot(msg.sender, msg.value);
    }

    fallback() external {
        emit LogBadCall(msg.sender);
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
        emit LogDepot(msg.sender, msg.value);
    }
}
