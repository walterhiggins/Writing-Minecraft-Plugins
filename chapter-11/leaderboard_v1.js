var playerSort = require('playerSort');
var utils = require('utils');
function jumps( sender ) {
  var players = utils.players();
  players.sort( playerSort.byJumps );
  players.reverse();
  // start of loop
  for ( var i = 0; i < players.length; i++ ) {

    var player = players[i];
    var jumpStats = utils.stat(player, 'jump' );
    echo( sender, player.name + ' ' + jumpStats);

  } // end of loop

};

exports.jumps = jumps;
