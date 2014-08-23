var dice = require('dice');
var greetings = ['Konnichiwa ','Hello ','Hola ','Bonjour '];
exports.random = function( ) {
  var len = greetings.length;
  var index = dice.roll(len);
  var greeting = greetings[ index ];
  return greeting;
};
