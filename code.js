// DOM Elements
let rock = document.getElementById('rockButton');
let paper = document.getElementById('paperButton');
let scissors = document.getElementById('scissorsButton');
let playerOption = document.getElementById('playerOption');
let oponentOption = document.getElementById('oponentOption');
let helpButton = document.getElementById('help');

// Game logic
let round = 1;
var roundsToWin;
let playerPoints = 0;
let oponentPoints = 0;
let player;
let oponent;

const showHelp = () => {
    Swal.fire({
        imageUrl: './images/howToPlay.jpg',
        // imageWidth: 1000,
        // imageHeight: 900,
        imageAlt: 'Help',
        confirmButtonColor: '#4370FE'
      })
}

const askRoundsToWin = async () => {
    let askingroundsToWin = await Swal.fire({
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
        input: 'select',
        inputOptions: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10'
        },
        confirmButtonColor: '#4370FE',
        confirmButtonText: 'PLAY!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputValidator: (value) => {
            return new Promise((resolve) => {
              if (!value) {
                resolve("You can't play without selecting the number of rounds to win.");
              }
              else {
                resolve();
              }
            })
          }
        })
          roundsToWin = parseInt(await askingroundsToWin.value);
}

const play = () => {
        round = 1;
        roundsToWin;
        playerPoints = 0;
        oponentPoints = 0;
        player;
        oponent;
        

        // Clean score
        document.getElementById('score').innerHTML = `<p>${playerPoints} - ${oponentPoints}</p>`;
        // Clean round count
        document.getElementById('round').innerHTML = `Round ${round}`;

        askRoundsToWin();
        if (roundsToWin === NaN) {
            askRoundsToWin();
        }

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
            text: 'You can do better than that, want to play again?',
            confirmButtonText: 'Yes',
          }).then((result) => {
              if(result.value) {
                play();
              }
          }); 
    }
    
}

const lockButtons = () => {
    rock.removeEventListener('click', selectRock);
    paper.removeEventListener('click', selectPaper);
    scissors.removeEventListener('click', selectScissors);
}

const unlockButtons = () => {
    rock.addEventListener('click', selectRock);
    paper.addEventListener('click', selectPaper);
    scissors.addEventListener('click', selectScissors);
}




const nextRound = () => {
    lockButtons();
    setTimeout(function() {
        //Go to the next round
        evaluate();
        round++;

        //Clean options
        oponentOption.setAttribute('src', './images/notDefinded.png');
        playerOption.setAttribute('src', './images/try.png')

        //Show the current round
        document.getElementById('round').innerHTML = `Round ${round}`;
        unlockButtons();

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


helpButton.addEventListener('click', showHelp);
