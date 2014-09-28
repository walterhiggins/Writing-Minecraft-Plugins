var greeting = require('greeting');
events.connect( function( event ) {
  var message = greeting.random() + event.player.name;
  echo( player, message );
} );
