//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract VolcanoTokenUpgradableV2 is ERC721Upgradeable, OwnableUpgradeable {
    uint256 tokenID;
    uint256 constant VERSION = 2;
    struct Metadata {
        uint256 tokenID;
        uint256 timestamp;
        string tokenURI;
    }

    mapping(address => Metadata[]) public tokenOwnership;
    mapping(uint256 => uint256) IDsToIndex; //stores the index of this token in the mapping's array
    modifier onlyTokenHolder(uint256 _ID) {
        _checkForOwner(_ID, msg.sender);
        _;
    }
    function initialize() public initializer {
        ERC721Upgradeable.__ERC721_init("Volcano", "VCT");
    }
    function getVersion() pure external returns (uint256) {
        return VERSION;
    }
    
    function _checkForOwner(uint256 _ID, address _user) internal view {
        address tokenOwner = ERC721Upgradeable.ownerOf(_ID);
        require(_user == tokenOwner, "Caller must be token owner");
    }

    function _removeMetadata(uint256 _ID) internal onlyTokenHolder(_ID) {
        uint256 index = IDsToIndex[_ID];
        delete tokenOwnership[msg.sender][index];
    }

    function mint(address _user, string memory tokenURI) external {
        uint256 ID = tokenID++;
        _safeMint(_user, ID);
        Metadata memory newMetadata = Metadata({
            timestamp: block.timestamp,
            tokenID: ID,
            tokenURI: tokenURI
        });
        tokenOwnership[_user].push(newMetadata);
        IDsToIndex[ID] = tokenOwnership[_user].length - 1;
    }

    function burnToken(uint256 _ID) external onlyTokenHolder(_ID) {
        _removeMetadata(_ID);
        _burn(_ID);
    }
}