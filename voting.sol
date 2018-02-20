pragma solidity ^0.4.20;

contract voting {

    uint totalVoteCount;
    address owner;
    bytes32[4] candidates;
    uint noOfCandidates;
    bool isActive;

    mapping(bytes32 => uint) candidateVoteCount;
    event votingEvent(address Voter, bytes32 Candidates);

    function voting (bytes32[4] _candidates) public {
        candidates = _candidates;
        noOfCandidates = _candidates.length;
        owner = msg.sender;
        isActive = true;
    }

    function vote(bytes32 _candidate) public {
        require(isActive);
        candidateVoteCount[_candidate] = candidateVoteCount[_candidate] + 1;
        votingEvent(msg.sender, _candidate);

    }

    function closeVote() public {
        require(msg.sender == owner);
        isActive = false;
    }

    // ["George Washington","Genghis Khan","Julius Caesar","Mansa Musa"]
    function getCandidatesAndVotes() public view returns (bytes32[4] candidateList, uint[4] votes) {
        uint[4] memory _votes;
        for (uint i = 0; i < candidates.length; i++) {
            _votes[i] = candidateVoteCount[candidates[i]];
        }
        return (candidates, _votes);
    }
}
