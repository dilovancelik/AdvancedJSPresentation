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
    votingContract.vote(candidate, (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`You succesfully voted for ${candidate}`);
        }
    })
}
