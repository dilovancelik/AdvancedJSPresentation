window.contractAddress = "0xb48bd6acdf2d5a52269760539e36e333db42c39a";

window.ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "closeVote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCandidatesAndVotes",
		"outputs": [
			{
				"name": "candidateList",
				"type": "bytes32[4]"
			},
			{
				"name": "votes",
				"type": "uint256[4]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_candidate",
				"type": "bytes32"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_candidates",
				"type": "bytes32[4]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "Voter",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Candidates",
				"type": "bytes32"
			}
		],
		"name": "votingEvent",
		"type": "event"
	}
]
