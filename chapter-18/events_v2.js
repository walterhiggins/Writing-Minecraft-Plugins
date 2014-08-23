var zones = require('protection/zones');
var plots = require('protection/plots');
/*
 can a player build on a location?
*/
function playerCanBuild( player, location ) { 
  // for now just check if player has a plot on this location
  return playerOwnsPlot( player, location );
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
  if (event.player.op){
    return;
  }
  if (playerCanBuild(event.player,
                     event.blockPlaced.location)){
    return;
  } 
  
  var boundingPlots = plots.getBoundingPlots(
    event.blockPlaced.location
  );
  var boundingZones = zones.getBoundingZones(
    event.blockPlaced.location
  );
  if (boundingPlots.length == 0 
      && boundingZones.length == 0){
    return;
  }
  event.cancelled = true;
}
function onBreak( event ) {
  if (event.player.op){
    return;
  }
  if (playerCanBuild( event.player, event.block.location ) ){
    return;
  }
  var boundingPlots = plots.getBoundingPlots(
    event.block.location
  );
  var boundingZones = zones.getBoundingZones(
    event.block.location
  );
  if (boundingPlots.length == 0 
      && boundingZones.length == 0){
    return;
  }
  event.cancelled = true;
}
events.blockPlace( onPlace );
events.blockBreak( onBreak );
