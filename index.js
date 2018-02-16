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
    votingContract.vote(candidate, {
        gas: 50000
    }, (err, res) => {
        if(err) {
            console.log(`Something went wrong, this is the error:\n`);
            throw err;
        }
        console.log(res);
    })
}

const updateCandidateVoteCount = function(_candidate) {
    votingContract.getCandidateVoteCount(_candidate, (err, res) => {
        if(err) {
            console.log(`Something went wrong, this is the error:\n`);
            throw err;
        }
        candidates[_candidate] = res["c"][0];
    })
};
const updateTotalVotecount = async function() {
    const candidateNames = Object.keys(candidates);
    candidateNames.forEach((_candidate) => {
        updateCandidateVoteCount(_candidate);
    });
}

const updateChart = async function() {
    await updateTotalVotecount();

    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(candidates) ,
            datasets: [{
                label: '# of Votes',
                data: Object.values(candidates) ,
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
}
