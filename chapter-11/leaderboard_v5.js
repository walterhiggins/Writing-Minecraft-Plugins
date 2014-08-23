var playerSort = require('playerSort');

function jumps( sender ) {
  var players = bukkit.players();
  players.sort( playerSort.byJumps );
  players.reverse();

  var i = 0;
  while ( i < players.length ) { // start of loop

    var player = players[i];
    var jumpStats = player.getStatistic( bukkit.stat.JUMP );
    sender.sendMessage( player.name + ' ' + jumpStats);
    
    i++;

  } // end of loop

}

exports.jumps = jumps;
