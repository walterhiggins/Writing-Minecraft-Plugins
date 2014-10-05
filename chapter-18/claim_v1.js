var plots = require('protection/plots');
var fireworks = require('fireworks');
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

      echo( player, 
        'Congratulations! You now own plot ' 
        + plot.number
      );
      fireworks.firework( player.location );
      return;
    }
  }
  echo( player, 'No available plots!');
}
command(claim);
