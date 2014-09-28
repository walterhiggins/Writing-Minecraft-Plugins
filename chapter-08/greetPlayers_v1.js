var greeting = require('greetings');
events.connect( function( event ) {
  var player = event.player;
  var message = greeting.random() + player.name;
  echo ( player, message );
} );
