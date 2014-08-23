var input = require('input');
var dice = require('dice');
function guessTheNumber( player ){
  var randomNumber = dice.roll(6);

  function checkAnswer( answer, guesser ){
    if ( answer == randomNumber ) {
      guesser.sendMessage('You guessed correct!');
    }
    guesser.sendMessage('Thanks for playing');
  };

  input( player,'Pick a number between 0 and 5',checkAnswer);
}

exports.guessTheNumber = guessTheNumber;

