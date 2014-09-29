var playerSort = require('playerSort');
var utils = require('utils');
function jumps( sender ) {
  var players = utils.players();
  players.sort( playerSort.byJumps );
  players.reverse();

  var i = 0;
  while ( i < players.length ) { // start of loop

    var player = players[i];
    var jumpStats = utils.stat( player, 'jump' );
    echo( sender, player.name + ' ' + jumpStats);
    
    i++;

  } // end of loop

}

exports.jumps = jumps;
