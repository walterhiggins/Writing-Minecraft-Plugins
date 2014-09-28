var greeting = require('greetings');
function greetPlayer( event ) {
  var player = event.player;
  var message = greeting.random() + player.name;
  echo( player, message );
};
events.connect( greetPlayer );
