'use strict';

let scores, roundScore, activePlayer, gamePlaying, prevDice, getScore;
init();
// document.querySelector('#current--' + activePlayer).textContent = dice;
// document.querySelector('#current--' + activePlayer).innerHTML =
//   '<em>' + dice + '</em>';

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    //2. Display the result
    let diceDOM = document.querySelector('.dice');
    let diceDOM2 = document.querySelector('.dice--1');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //3.
    if (dice === 6 && dice2 === 6) {
      //Player looses score
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = '0';
      nextPlayer();
      //  Update the round score if the rolled number was NOT a 1
    } else if (dice === 3 && dice2 === 3) {
      //Add score dice * 3
      roundScore += (dice + dice2) * 3;
      console.log(roundScore);
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else if (dice !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice + dice2;
      console.log(roundScore);
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      //Next player
      nextPlayer();
    }

    prevDice = [dice, dice2];
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    getScore = document.querySelector('.change--winning__score--txt').value;
    let winningScore;
    // undefined, 0, null or "" are coerced to false
    //anything else is coerced to true
    if (getScore) {
      winningScore = getScore;
    } else {
      winningScore = 100;
    }

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice--1').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  // document.querySelector('.player--0').classList.remove('player--active');
  // document.querySelector('.player--1').classList.add('player--active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice--1').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice--1').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}
