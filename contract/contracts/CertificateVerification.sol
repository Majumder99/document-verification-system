// SPDX-License-Identifier: MIT
pragma solidity >=0.4.1;

contract CertificateVerification {

    mapping(string => uint) documentAddTimeMap; //contains when documents was added
    mapping(string => address) documentAddKeyMap; //contains public key of the user
    mapping(address => bool) verifiedUser; //contains verified users 
    mapping(address => string) userFilesCid; //contains user's ipfs
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    //setting the user who deployed this contract as owner
    modifier owner_check(){
        require(owner == msg.sender, "Sender is not owner");
        _;
    }

    //only owner can add files to the contract
    function add_files(string memory ipfs_cid) public owner_check returns(bool) {
        //check if already added
        if (documentAddTimeMap[ipfs_cid] > 0) {
            return false;
        }
        //add now
        uint timeAdded = block.timestamp;
        documentAddTimeMap[ipfs_cid] = timeAdded;
        return true;
    }

    //this will verify user's uploaded document
    function verifyDocument(string memory ipfs_cid) public returns (bool){
        if (documentAddTimeMap[ipfs_cid] > 0) {
            verifiedUser[msg.sender] = true;
            userFilesCid[msg.sender] = ipfs_cid;
            return true;
        }
        return false;
    }

    //give true to the verified files
    function verified(address user) public view returns(bool){
        if(verifiedUser[user]){
            return verifiedUser[user];
        }else{
            return false;
        }
    }

    //when the user will click university then his/her address will come here and return me the ipfs cid.. 
    function get_ipfs_cid(address user) public view returns(string memory){
        return userFilesCid[user];
    }
}
