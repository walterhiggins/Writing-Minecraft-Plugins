/*
 this module provides a roll() function which returns 
 a random number.
 the range of numbers is set using the sides parameter.
 if no sides parameter is provided, the default is 6.
 Usage: 
   var dice = require('dice');
   var randomNumber1 = dice.roll();
   var randomNumber2 = dice.roll();
*/
exports.roll = function( sides ) {
  if ( typeof sides === 'undefined' ) { 
    sides = 6;
  }
  var result = Math.random();
  result = result * sides;
  result = Math.floor(result);
  return result;
};
