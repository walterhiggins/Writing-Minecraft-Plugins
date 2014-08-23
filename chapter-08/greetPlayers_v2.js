var greeting = require('greetings');
function greetPlayer( event ) {
  var player = event.player;
  var message = greeting.random() + player.name;
  player.sendMessage( message );
};
events.playerJoin( greetPlayer );
