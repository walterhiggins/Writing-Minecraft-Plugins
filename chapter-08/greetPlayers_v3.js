var greeting = require('greetings');
var fireworks = require('fireworks');
function greetPlayer( event ) {
  var player = event.player;
  var message = greeting.random() + player.name;
  player.sendMessage( message );
  fireworks.firework(player.location);
};
events.playerJoin( greetPlayer );
