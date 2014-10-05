var zones = require('protection/zones');

function onPlace( event ) {
  if ( isOp(event.player) ) {
    return;
  }
  var block = event.blockPlaced;
  var boundingZones = zones.getBoundingZones(block.location);
  if (boundingZones.length == 0){
    return;
  }
  event.setCanceled();
}
function onBreak( event ){
  if ( isOp(event.player) ) {
    return;
  }
  var block = event.block;
  var boundingZones = zones.getBoundingZones(block.location);
  if (boundingZones.length == 0){
    return;
  }
  event.setCanceled();
}
events.blockPlace( onPlace );
events.blockDestroy( onBreak );
