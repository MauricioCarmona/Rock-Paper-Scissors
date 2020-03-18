// DOM Elements
let rock = document.getElementById('rockButton');
let paper = document.getElementById('paperButton');
let scissors = document.getElementById('scissorsButton');
let playerOption = document.getElementById('playerOption');
let oponentOption = document.getElementById('oponentOption');

// Game logic
let round = 1;
let roundsToWin;
let playerPoints = 0;
let oponentPoints = 0;
let player;
let oponent;

const play = () => {
        round = 1;
        roundsToWin;
        playerPoints = 0;
        oponentPoints = 0;
        player;
        oponent;
        
        document.getElementById('score').innerHTML = `<p>${playerPoints} - ${oponentPoints}</p>`;

    Swal.fire({
        title: 'Welcome to the Rock, Paper, Scissors game',
        text: 'Please select the number of rounds to win:',
        imageUrl: './images/logo.png',
        imageWidth: 300,
        imageHeight: 300,
        width: 600,
        padding: '3em',
        backdrop: `
          rgba(137, 172, 255, 0.4)
          left top
          no-repeat
        `,
        input: 'number',
        confirmButtonColor: '#4370FE',
        confirmButtonText: 'PLAY!'
      }).then((result) => {
          roundsToWin = parseInt(result.value);
      })

}

const evaluate = () => {
    if(player === 'rock' && oponent === 'paper') {
        // Paper wins over rock
        oponentPoints++;
    }
    else if(player === 'rock' && oponent === 'scissors') {
        // Rock wins over scissors
        playerPoints++;
    }
    else if(player === 'paper' && oponent === 'rock') {
        // Paper wins over rock
        playerPoints++;
    }
    else if(player === 'paper' && oponent === 'scissors') {
        // Scissors wins over paper
        oponentPoints++;
    }
    else if(player === 'scissors' && oponent === 'paper') {
        // Scissors wins over paper
        playerPoints++;
    }
    else if(player === 'scissors' && oponent === 'rock') {
        // Rock wins over scissors
        oponentPoints++;
    }
    else if (player === oponent) {
        //Tie
        console.log('EMPATE');
    }

    document.getElementById('score').innerHTML = `<p>${playerPoints} - ${oponentPoints}</p>`;

    if(playerPoints >= roundsToWin) {
        Swal.fire({
            icon: 'success',
            title: 'YOU WIN!',
            text: 'Congratulations, want to play again?',
            confirmButtonText: 'Yes',
          }).then((result) => {
            if(result.value) {
              play();
            }
        }); 
    }
    if(oponentPoints >= roundsToWin) {
        Swal.fire({
            icon: 'error',
            title: 'YOU LOST ):',
            text: 'You can do better thant that, want to play again?',
            confirmButtonText: 'Yes',
          }).then((result) => {
              if(result.value) {
                play();
              }
          }); 
    }
    
}




const nextRound = () => {
    setTimeout(function() {
        //Go to the next round
        evaluate();
        round++;

        //Clean options
        oponentOption.setAttribute('src', './images/notDefinded.png');
        playerOption.setAttribute('src', './images/try.png')

        //Show the current round
        document.getElementById('round').innerHTML = `Round ${round}`;

    }, 1500);
}

const oponentTurn = () => {
    //Select randomly rock, paper or scissors
    let random = Math.floor(Math.random() * (4 - 1) + 1);
    
    switch(random) {
        case 1:
            oponent = 'rock';
            oponentOption.setAttribute('src', './images/rock.png');
            break
        case 2:
            oponent = 'paper';
            oponentOption.setAttribute('src', './images/paper.png');
            break
        case 3:
            oponent = 'scissors';
            oponentOption.setAttribute('src', './images/scissors.png');
            break
        default:
            alert('Error');
    }
}

const selectRock = () => {
    player = 'rock';
    playerOption.setAttribute('src', './images/rock.png');

    oponentTurn();
    nextRound();
}

const selectPaper = () => {
    player = 'paper';
    playerOption.setAttribute('src', './images/paper.png');

    oponentTurn();
    nextRound();
}

const selectScissors = () => {
    player = 'scissors';
    playerOption.setAttribute('src', './images/scissors.png');

    oponentTurn();
    nextRound();
}

play();

// Event listeners
rock.addEventListener('click', selectRock);
paper.addEventListener('click', selectPaper);
scissors.addEventListener('click', selectScissors);

