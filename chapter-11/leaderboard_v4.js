
function jumps( sender ) {
  var players = bukkit.players();

  var i = 0;
  while ( i < players.length ) { // start of loop

    var player = players[i];
    var jumpStats = player.getStatistic( bukkit.stat.JUMP );
    if ( jumpStats == 0 ) {
      continue;
    }
    sender.sendMessage( player.name + ' ' + jumpStats);
      
    i++;
  } // end of loop

};

exports.jumps = jumps;
