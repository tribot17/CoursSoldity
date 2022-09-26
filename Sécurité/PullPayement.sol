pragma solidity 0.8.17;

contract auction {
    address highestBidder;
    uint256 highestBid;
    mapping(address => uint256) refunds;

    function bid() external payable {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            refunds[highestBidder] += highestBid; // record the refund that this user can claim
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function withdrawRefund() external {
        uint256 refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: refund}("");
        require(success);
    }
}
