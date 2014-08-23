var items = require('items');
function noLava( event ){
  var material = event.bucket;
  var player = event.player;
  if (player.op) {
    return;
  }
  if (items.lavaBucket( material ) ) {
    event.cancelled = true;
  }
}

events.playerBucketEmpty( noLava );
