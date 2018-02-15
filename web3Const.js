window.contractAddress = "0xdccffdce7bd7b07c14fc852d6ace5391f661b6e2";

window.ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"name": "candidateList",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_candidate",
				"type": "bytes32"
			}
		],
		"name": "getCandidateVoteCount",
		"outputs": [
			{
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
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
				"type": "bytes32[]"
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

window.candidates = ["George Washington", "Genghis Khan", "Julius Caesar", "Mahatma Gandhi"]
