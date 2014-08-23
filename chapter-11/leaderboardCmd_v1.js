var lboard = require('leaderboard');

function leaderboard( params, sender ) {
  lboard.jumps( sender );
};

command( leaderboard );
