pragma solidity ^0.4.18;

contract voting {

    uint totalVoteCount;
    address owner;
    bytes32[] candidates;
    bool isActive;

    mapping(address => bool) voted;
    mapping(bytes32 => uint) candidateVoteCount;
    event votingEvent(address Voter, bytes32 Candidates);

    function voting (bytes32[] _candidates) public {
        candidates = _candidates;
        owner = msg.sender;
        isActive = true;
    }

    function vote(bytes32 _candidate) public {
        require(!voted[msg.sender]);
        require(isActive);
        voted[msg.sender] = true;
        candidateVoteCount[_candidate] = candidateVoteCount[_candidate] + 1;
        votingEvent(msg.sender, _candidate);

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
