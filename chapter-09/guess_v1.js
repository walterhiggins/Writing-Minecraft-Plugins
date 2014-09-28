var input = require('input');
var dice = require('dice');
var randomNumber;

function checkAnswer( answer, guesser ){
  if ( answer == randomNumber ) {
    echo ( guesser, 'You guessed correct!' );
  }
  echo( guesser, 'Thanks for playing' );
}

function guessTheNumber( player ){
  randomNumber = dice.roll(6);
  input( player,'Pick a number between 0 and 5',checkAnswer);
}

exports.guessTheNumber = guessTheNumber;

