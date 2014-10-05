var plots = require('protection/plots');
var fireworks = require('fireworks');
var utils = require('utils');

function claim( params, player ){
  var existingClaim = plots.getClaim( player );
  var boundingPlots = plots.getBoundingPlots(
    player.location
  );
  if ( existingClaim ) {
    echo( player, 'You already have plot number ' + 
	  existingClaim.number);
    return;
  }
  if (boundingPlots.length == 0){
    echo( player, 'You are not in a plot!');
    return;
  }
  for (var i = 0;i < boundingPlots.length;i++){
    var plot = boundingPlots[i];
    if (!plot.claimedBy){
      // convert from Java to JavaScript string
      plot.claimedBy = '' + player.name; 

      echo( player, 'Congratulations! You now own plot ' + 
	    plot.number
      );
      fireworks.firework( player.location );
      return;
    }
  }
  echo( player, 'No available plots!');
}
command(claim);

function abandon(params, player){
  var existingClaim = plots.getClaim( player );
  if (existingClaim){
    existingClaim.claimedBy = null;
    echo( player, 'You have given up your claim on plot ' + 
	  existingClaim.number
    );
  } else {
    echo( player, 'You do not have any plots to abandon!');
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
    echo( player, 'You have shared with ' + trustedPlayer);
  } else {
    echo( player, 'You do not have any plots to share!');
  }
}
command(share, utils.playerNames);
