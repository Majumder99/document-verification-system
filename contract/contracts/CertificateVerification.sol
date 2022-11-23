// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CertificateVerification {
    event AddedDocument(string ipfs_hash, address id, uint256 timeAdded);
    event AddDocumentError(string ipfs_hash, string error);

    mapping(string => uint256) documentAddTimeMap; //contains when documents was added
    mapping(string => address) documentAddKeyMap; //contains who (public key) added the document

    constructor() {}

    function add_book(string memory ipfs_hash) public {
        //check if already added
        if (documentAddTimeMap[ipfs_hash] > 0) {
            //already added by someone else
            emit AddDocumentError(ipfs_hash, "already added");
        }
        //add now
        uint256 timeAdded = block.timestamp;
        documentAddTimeMap[ipfs_hash] = timeAdded;
        address admin_id =  msg.sender;
        documentAddKeyMap[ipfs_hash] = admin_id;
        emit AddedDocument(ipfs_hash, admin_id, timeAdded);
    }

    function verifyDocument(string memory ipfs_hash)
        public
        view
        returns (bool)
    {
        if (documentAddTimeMap[ipfs_hash] > 0) return true;
        return false;
    }

    function getDocumentAddedTime(string memory ipfs_hash)
        public
        view
        returns (uint256)
    {
        return documentAddTimeMap[ipfs_hash];
    }

    function getDocumentAdderPublicId(string memory ipfs_hash)
        public
        view
        returns (address)
    {
        return documentAddKeyMap[ipfs_hash];
    }
}
