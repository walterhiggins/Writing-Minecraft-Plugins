var utils = require('utils');
function jumps( sender ) {
  var players = utils.players();

  var i = 0;
  while ( i < players.length ) { // start of loop

    var player = players[i];
    var jumpStats = utils.stat( player, 'jump');
    if ( jumpStats == 0 ) {
      continue;
    }
    echo( sender, player.name + ' ' + jumpStats);
      
    i++;
  } // end of loop

};

exports.jumps = jumps;
