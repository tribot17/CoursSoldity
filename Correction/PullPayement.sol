pragma solidity 0.8.17;

contract auction {
    address highestBidder;
    uint256 highestBid;

    function bid() public payable {
        require(msg.value >= highestBid);

        if (highestBidder != address(0)) {
            (bool success, ) = highestBidder.call{value: highestBid}("");
            require(success); // if this call consistently fails, no one else can bid
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
