var greeting = require('greetings');
events.playerJoin( function( event ) {
  var player = event.player;
  var message = greeting.random() + player.name;
  player.sendMessage( message );
} );
