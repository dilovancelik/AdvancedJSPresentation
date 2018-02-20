window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        window.votingContract = web3.eth.contract(ABI).at(contractAddress);
        hasWeb3();
    } else {
        noWeb3();
    }
})

const noWeb3 = function() {
    const noWeb3Div = document.getElementById('noWeb3');
    noWeb3Div.style.display = "block";
}



const hasWeb3 = function() {
    const hasWeb3Div = document.getElementById('hasWeb3');
    hasWeb3Div.style.display = "block";
}

const vote = function(candidate) {
    const waitingForVote = document.getElementById('waitingForVote');
    votingContract.vote(candidate, {
        gas: 50000
    }, (err, res) => {
        if(err) {
            console.log(`Something went wrong, this is the error:\n`);
            throw err;
        }
        waitingForVote.innerHTML = "Waiting for your vote to get registered, grab yourself a cop of coffee.";
        getTransactionReceipt(res);
    })
}

const getTransactionReceipt = function(transaction) {
    const waitingForVote = document.getElementById('waitingForVote');
    web3.eth.getTransactionReceipt(transaction, (err, receipt) => {
        if(!err & !receipt) {
            setTimeout(getTransactionReceipt(transaction), 3000);
        } else if (err) {
            throw err;
        } else if (receipt.status === "0x1") {
            waitingForVote.innerHTML = "Your vote was successfully registered";
        } else if (receipt.status !== "0x1") {
            waitingForVote.innerHTML = "Something went wrong with your vote.";
        }
    })
}

const getVoteCount = function() {
    return new Promise((resolve, reject) => {
        votingContract.getCandidatesAndVotes((err, res) => {
            if(err) {
                reject(err);
            }
            const candidates = res[0].map(candidate => web3.toUtf8(candidate));
            const candidateVotes = res[1].map(votes => votes["c"][0]);
            resolve([candidates, candidateVotes]);
        })
    })
}

const closeVote = function() {
    votingContract.closeVote((err, res) => {
        if(err) {
            throw err;
        };
        getTransactionReceiptCloseVote(res);
    });
}

const getTransactionReceiptCloseVote = function(transaction) {
    web3.eth.getTransactionReceipt(transaction, (err, receipt) => {
        if(!err & !receipt) {
            setTimeout(getTransactionReceiptCloseVote(transaction), 3000);
        } else if (err) {
            throw err;
        } else if (receipt.status === "0x1") {
            alert("You successfully closed the vote");
        } else if (receipt.status !== "0x1") {
            alert("You could not close the vote");
        }
    })
}



const updateChart = function() {
    getVoteCount().then((candidates) => {
        const ctx = document.getElementById("myChart").getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: candidates[0] ,
                datasets: [{
                    label: '# of Votes',
                    data: candidates[1] ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    })
}
