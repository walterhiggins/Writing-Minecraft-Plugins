var leaderboard = require('leaderboard');

function leaderboardCmd( params, sender ) {
  leaderboard.jumps( sender );
};

command( 'leaderboard', leaderboardCmd );
