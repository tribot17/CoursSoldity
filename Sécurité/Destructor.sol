pragma solidity 0.8.17;

contract Destructor {
    function doWork() external {
        selfdestruct(payable(0));
    }
}

contract Worker {
    function doWork(address _internalWorker) public {
        // unsafe
        _internalWorker.delegatecall(abi.encodeWithSignature("doWork()"));
    }
}
