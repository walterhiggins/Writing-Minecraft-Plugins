var playerSort = require('playerSort');

function jumps( sender ) {
  var players = bukkit.players();
  players.sort( playerSort.byJumps );
  players.reverse();
  // start of loop
  for ( var i = 0; i < players.length; i++ ) {

    var player = players[i];
    var jumpStats = player.getStatistic( bukkit.stat.JUMP );
    sender.sendMessage( player.name + ' ' + jumpStats);

  } // end of loop

};

exports.jumps = jumps;
