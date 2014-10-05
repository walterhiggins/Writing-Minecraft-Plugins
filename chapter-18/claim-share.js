var utils = require('utils');
function share( params, player ) {
  // convert from Java to JavaScript string
  var trustedPlayer = '' + params[0]; 

  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    if (typeof existingClaim.sharedWith == 'undefined'){
      existingClaim.sharedWith = [];
    }
    existingClaim.sharedWith.push( trustedPlayer ); 
    echo( player, 'You have shared with ' + trustedPlayer);
  } else {
    echo( player, 'You do not have any plots to share!' );
  }
}
command(share, utils.playerNames);
