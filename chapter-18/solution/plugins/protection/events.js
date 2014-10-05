var zones = require('protection/zones');
var plots = require('protection/plots');
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
/*
 does the player own a plot of land at location?
*/
function playerOwnsPlot( player, location ) {
  var boundingPlots = plots.getBoundingPlots( location );
  for (var i = 0;i < boundingPlots.length; i++){
    var plot = boundingPlots[i];
    if (plot.claimedBy == player.name){
      return true;
    }
  }
  return false;
}
function onPlace( event ) {
  if ( isOp( event.player) ){
    return;
  }
  var block = event.blockPlaced;
  if (playerCanBuild(event.player, block.location)){
    return;
  } 
  
  var boundingPlots = plots.getBoundingPlots( block.location );
  var boundingZones = zones.getBoundingZones( block.location );
  if (boundingPlots.length == 0 && boundingZones.length == 0){
    return;
  }
  event.setCanceled();
}
function onBreak( event ) {
  if ( isOp(event.player) ){
    return;
  }
  var block = event.block;
  if (playerCanBuild( event.player, block.location ) ){
    return;
  }
  var boundingPlots = plots.getBoundingPlots( block.location );
  var boundingZones = zones.getBoundingZones( block.location );
  if (boundingPlots.length == 0 && boundingZones.length == 0){
    return;
  }
  event.setCanceled();
}
events.blockPlace( onPlace );
events.blockDestroy( onBreak );
