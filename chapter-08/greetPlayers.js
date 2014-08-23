var greeting = require('greeting');
events.playerJoin( function( event ) {
  var message = greeting.random() + event.player.name;
  player.sendMessage( message );
} );
