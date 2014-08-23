var dice = require('dice');
var greetings = ['Hello ','Hola ','Bonjour ','Konnichiwa '];
var len = greetings.length;
function random(){
  var index = dice.roll(len);
  var greeting = greetings[ index ];
  return greeting;
}
exports.random = random;
