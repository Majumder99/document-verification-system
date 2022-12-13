// SPDX-License-Identifier: MIT
pragma solidity >=0.4.1;

contract CertificateVerification {

 event outputResult(bool);

    mapping(string => uint256) documentAddTimeMap; //contains when documents was added
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

    //only student can verify files
    modifier student_check(){
        require(msg.sender != owner, "Sender have to be a student");
        _;
    }

    //only owner can add files to the contract
    // string memory ipfs_cid
    function add_files(string memory ipfs_cid) public owner_check returns(bool){
        //check if already added
        // return ipfs_cid;
        // return false;
        if (documentAddTimeMap[ipfs_cid] > 0) {
            //already added by someone else
            // return documentAddTimeMap[ipfs_cid];
            emit outputResult(false);
            return false;
        }
        //add now
        uint256 timeAdded = block.timestamp;
        documentAddTimeMap[ipfs_cid] = timeAdded;
        emit outputResult(true);
        return true;
        // documentAddTimeMap[ipfs_cid] = true;
        // return documentAddTimeMap[ipfs_cid];
    }

    //this will verify user's uploaded document
    function verifyDocument(string memory ipfs_cid) public student_check returns(bool){
        if (documentAddTimeMap[ipfs_cid] > 0) {
            verifiedUser[msg.sender] = true;
            userFilesCid[msg.sender] = ipfs_cid;
            emit outputResult(true);
            return true;
        }
        emit outputResult(false);
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
