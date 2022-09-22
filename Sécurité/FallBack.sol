pragma solidity 0.8.17;

contract myContract {
    mapping(address => uint256) balances;

    event LogDepositReceived(address _address);

    // mauvais
    fallback() external payable {
        balances[msg.sender] += msg.value;
    }

    // mieux
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    fallback() external payable {
        emit LogDepositReceived(msg.sender);
    }

    // mauvais
    fallback() external payable {
        emit LogDepositReceived(msg.sender);
    }

    // mieux
    fallback() external payable {
        require(msg.data.length == 0);
        emit LogDepositReceived(msg.sender);
    }

    // moyen
    fallback() external payable {
        require(msg.data.length == 0);
        emit LogDepositReceived(msg.sender);
    }

    //mieux
    receive() external payable {
        emit LogDepositReceived(msg.sender);
    }
}
