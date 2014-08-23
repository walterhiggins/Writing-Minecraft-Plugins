var input = require('input');
var dice = require('dice');
var fireworks = require('fireworks');
function guessTheNumber( player ){
  var randomNumber = dice.roll(6);

  function checkAnswer( guess, guesser, repeat ){
    if ( guess == randomNumber ) {
      guesser.sendMessage('You guessed correct!');
      if ( guesser.player ) {
        fireworks.firework( guesser.location );
      }
    } else if ( guess == 'quit') {
      guesser.sendMessage('Thanks for playing');
    } else if ( guess < randomNumber ) {
      guesser.sendMessage('Too low. Guess again');
      repeat();
    } else if ( guess > randomNumber ) {
      guesser.sendMessage('Too high. Guess again');
      repeat();
    } 
  };

  input( player,'Pick a number between 0 and 5',checkAnswer);
}
exports.guessTheNumber = guessTheNumber;
