function abandon( params, player ) {
  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    existingClaim.claimedBy = null;
    echo( player, 'You have given up your claim on plot ' + 
      existingClaim.number
    );
  } else {
    echo( player, 'You do not have any plots to abandon!' );
  }
}
command(abandon);
