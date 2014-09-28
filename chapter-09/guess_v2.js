var input = require('input');
var dice = require('dice');
var randomNumber;

function checkAnswer( guess, guesser ){
  if ( guess == randomNumber ) {
    echo( guesser, 'You guessed correct!');
  } else {
    echo( guesser, 'Better luck next time');
  }
  echo( guesser, 'Thanks for playing');
}

function guessTheNumber( player ){
  randomNumber = dice.roll(6);
  input( player,'Pick a number between 0 and 5',checkAnswer);
}
exports.guessTheNumber = guessTheNumber;

