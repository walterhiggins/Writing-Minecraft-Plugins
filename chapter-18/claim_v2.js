var plots = require('protection/plots');
var fireworks = require('fireworks');
function claim( params, player ){
  var existingClaim = plots.getClaim( player );
  var boundingPlots = plots.getBoundingPlots(
    player.location
  );
  if ( existingClaim ) {
    player.sendMessage('You already have plot number ' + 
                       existingClaim.number);
    return;
  }
  if (boundingPlots.length == 0){
    player.sendMessage('You are not in a plot!');
    return;
  }
  for (var i = 0;i < boundingPlots.length;i++){
    var plot = boundingPlots[i];
    if (!plot.claimedBy){
      // convert from Java to JavaScript string
      plot.claimedBy = '' + player.name; 

      player.sendMessage(
	'Congratulations! You now own plot ' 
	+ plot.number
      );
      fireworks.firework( player.location );
      return;
    }
  }
  player.sendMessage('No available plots!');
}
command(claim);

function abandon(params, player){
  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    existingClaim.claimedBy = null;
    player.sendMessage(
      'You have given up your claim on plot ' 
      + existingClaim.number
    );
  } else {
    player.sendMessage(
      'You do not have any plots to abandon!');
  }
}
command(abandon);

function share( params, player){
  var trustedPlayer = params[0];
  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    if (typeof existingClaim.sharedWith == 'undefined'){
      existingClaim.sharedWith = [];
    }
    existingClaim.sharedWith.push('' + trustedPlayer);
    player.sendMessage(
      'You have shared with ' + trustedPlayer);
  } else {
    player.sendMessage(
      'You do not have any plots to share!');
  }
}
command(share, bukkit.playerNames);
