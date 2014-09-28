var input = require('input');
var dice = require('dice');
var fireworks = require('fireworks');
var randomNumber;

function checkAnswer( guess, guesser, repeat ){
  if ( guess == randomNumber ) {
    echo( guesser, 'You guessed correct!');
    if ( guesser.location ) {
      fireworks.firework( guesser.location );
    }
  } else if ( guess == 'quit') {
    echo( guesser, 'Thanks for playing');
  } else if ( guess < randomNumber ) {
    echo( guesser, 'Too low. Guess again');
    repeat();
  } else if ( guess > randomNumber ) {
    echo( guesser, 'Too high. Guess again');
    repeat();
  } 
}

function guessTheNumber( player ){
  randomNumber = dice.roll(6);
  input( player,'Pick a number between 0 and 5',checkAnswer);
}
exports.guessTheNumber = guessTheNumber;
