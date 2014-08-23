var zones = require('protection/zones');

function onPlace( event ) {
  if (event.player.op){
    return;
  }
  var boundingZones = zones.getBoundingZones(
    event.blockPlaced.location);
  if (boundingZones.length == 0){
    return;
  }
  event.cancelled = true;
}
function onBreak( event ){
  if (event.player.op){
    return;
  }
  var boundingZones = zones.getBoundingZones(
    event.block.location);
  if (boundingZones.length == 0){
    return;
  }
  event.cancelled = true;
}
events.blockPlace( onPlace );
events.blockBreak( onBreak );
