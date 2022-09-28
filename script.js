`use strict`;
/**
 * GAME RULES:
 * - The game has 2 players, playing in rounds
 * - In each turn, a player rolls 2 dices as many times as he wishes.each result is being added to his ROUND SCORE
 * - But if player rolls the 1, ALL his current scores get lost. after thats its the next player's turn
 * - the player can choose "HOLD" which means that his Round score gets added to is global score. after that its next player's turn aswell
 * - The first , who reaches winning score , which by default is 100 if players wont choose  , wins
 * 
 * - Players loses his ENTIRE score (global and current) if they roll 2 sixes in a row.affter that,its the next players turn aswell.
 * 
 */

// initial variables
let scores, roundedScore, activePlayer, dice, randNum1, randNum2, gameIsBeingPlayed, lastScore1, lastScore2;

//declare buttons
let rollBtn, holdBtn, newGameBtn;
rollBtn = document.querySelector('.btn--roll');
holdBtn = document.querySelector('.btn--hold');
newGameBtn = document.querySelector('.btn--new');

//declare winning score according to input winscore value
//if winscore value is presented , winning score = winscore else  winning score  is 100 by default
let winScore, winningScore;
winScore = document.querySelector('.win--score');
winScore.addEventListener('change', () => {
    if (winScore.value) {
        winningScore = winScore.value;
    } else {
        winningScore = 100;
    }
    winScore.style.opacity = 0;
    winScore.style.pointerEvents = 'none';

})

//initialize game
initGame();

rollBtn.addEventListener('click', () => {
    if (gameIsBeingPlayed) {
        //generate random nummber for dice roll 
        randNum1 = Math.floor(Math.random() * 6) + 1;
        randNum2 = Math.floor(Math.random() * 6) + 1;
        //update dom according to dice number was generated below
        roundedScore += randNum1 + randNum2;
        dice[0].src = 'dice-' + randNum1 + '.png';
        dice[1].src = 'dice-' + randNum2 + '.png';
        makeDicesappear();

        if (lastScore1 === 6 && randNum1 === 6 || lastScore2 === 6 && randNum2 === 6) {
            //current player loses all scores
            scores[activePlayer] = 0;
            document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
            changePlayer();
        } else if (randNum1 !== 1 && randNum2 !== 1) {
            //add roundedscore to active players current scores 
            document.getElementById('current--' + activePlayer).textContent = roundedScore;
        } else {
            //change active player 
            changePlayer();
        }
        //we assign  random number to last score  vallue to check next time if it was rolled 6 two times in a row 
        lastScore1 = randNum1;
        lastScore2 = randNum2;
    }

});

holdBtn.addEventListener('click', () => {
    if (gameIsBeingPlayed) {
        scores[activePlayer] += roundedScore;
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

        //check if player won game
        if (scores[activePlayer] >= winningScore) {
            makeDicesDisappear();
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            winScore.value = '';
            gameIsBeingPlayed = false;
        } else {
            changePlayer();
        }
    }
});


//new game button startes game all over
newGameBtn.addEventListener('click', initGame);


//function for changeing players turn
function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundedScore = 0;
    makeDicesDisappear();
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

}

//game init function
function initGame() {
    scores = [0, 0];
    roundedScore = 0;
    activePlayer = 0;
    gameIsBeingPlayed = true;

    dice = document.querySelectorAll('.dice');
    makeDicesDisappear();

    winScore.style.opacity = 1;
    winScore.style.pointerEvents = 'auto';
    winScore.value = '';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

}



function makeDicesDisappear() {
    dice.forEach(element => {
        element.style.display = 'none';
    });
}

function makeDicesappear() {
    dice.forEach(element => {
        element.style.display = 'block';
    });
}