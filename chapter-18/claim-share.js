function share( params, player ) {
  // convert from Java to JavaScript string
  var trustedPlayer = '' + params[0]; 

  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    if (typeof existingClaim.sharedWith == 'undefined'){
      existingClaim.sharedWith = [];
    }
    existingClaim.sharedWith.push( trustedPlayer ); 
    player.sendMessage('You have shared with ' 
		       + trustedPlayer);
  } else {
    player.sendMessage(
      'You do not have any plots to share!'
    );
  }
}
command(share, bukkit.playerNames);
