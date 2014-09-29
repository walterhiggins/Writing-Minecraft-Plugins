var playerSort = require('playerSort');
var utils = require('utils');

function jumps( sender ) {
  var players = utils.players();
  players.sort( playerSort.byJumps );
  players.reverse();

  for (var i = 0; i < players.length; i++ ) {

    var player = players[i];
    var playerJumps = utils.stat( player, 'jump' );
    echo( sender, player.name + '_____' + playerJumps);

  }

};

exports.jumps = jumps;
