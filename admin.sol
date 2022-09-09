pragma solidity 0.8.16;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Admin is Ownable {
    mapping(address => bool) private _whitelist;
    mapping(address => bool) private _blacklist;
    event Whitelisted(address _address);
    event Blacklisted(address _address);

    function whitelist(address _address) public onlyOwner {
        require(!_whitelist[_address], "This address is already whitelisted !");
        require(!_blacklist[_address], "This address is already blacklisted !");
        _whitelist[_address] = true;
        emit Whitelisted(_address);
    }

    function isWhitelisted(address _address)
        public
        view
        onlyOwner
        returns (bool)
    {
        return _whitelist[_address];
    }

    function blacklist(address _address) public onlyOwner {
        require(!_blacklist[_address], "This address is already blacklisted !");
        require(!_whitelist[_address], "This address is already whitelisted !");
        _blacklist[_address] = true;
        emit Blacklisted(_address);
    }

    function isBlacklisted(address _address)
        public
        view
        onlyOwner
        returns (bool)
    {
        return _blacklist[_address];
    }
}
