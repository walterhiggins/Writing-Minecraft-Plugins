/*
 can a player build on a location?
*/
function playerCanBuild( player, location ) { 
  // check if player has a plot on this 
  // location or is trusted
  var result = playerOwnsPlot( player, location ) || 
    playerIsTrusted( player, location );
  return result;
}

function playerIsTrusted( player, location) {
  var playerName = ''+ player.name;

  var boundingPlots = plots.getBoundingPlots( location );
  for (var i = 0;i < boundingPlots.length; i++){
    var plot = boundingPlots[i];
    var sharedWith = plot.sharedWith;
    if (!sharedWith ) {
      continue;
    }
    for (var j = 0; j < sharedWith.length; j++){
      if (sharedWith[j] == playerName){
        return true;
      }
    }
  }
  return false;
}
