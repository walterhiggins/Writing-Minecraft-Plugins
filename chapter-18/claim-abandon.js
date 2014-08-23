function abandon( params, player ) {
  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    existingClaim.claimedBy = null;
    player.sendMessage(
      'You have given up your claim on plot ' + 
      existingClaim.number
    );
  } else {
    player.sendMessage(
      'You do not have any plots to abandon!'
    );
  }
}
command(abandon);
