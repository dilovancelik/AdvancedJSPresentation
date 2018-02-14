pragma solidity ^0.4.18;

contract voting {

    uint totalVoteCount;
    address owner;
    bytes32[] candidates;
    bool isActive;

    mapping(bytes32 => uint) candidateVoteCount;

    function voting (bytes32[] _candidates) public {
        candidates = _candidates;
        owner = msg.sender;
        isActive = true;
    }

    function vote(bytes32 _candidate) public {
        require(isActive);
        candidateVoteCount[_candidate] = candidateVoteCount[_candidate] + 1;
    }

    function closeVote() public {
        require(msg.sender == owner);
        isActive = false;
    }

    function getCandidates() public view returns (bytes32[] candidateList) {
        return candidates;
    }

    function getCandidateVoteCount(bytes32 _candidate) public view returns (uint voteCount) {
        return candidateVoteCount[_candidate];
    }
}
