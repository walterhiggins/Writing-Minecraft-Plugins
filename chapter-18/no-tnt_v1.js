var items = require('items');
function noTNT( event ){
  var material = event.blockPlaced.type;
  var player = event.player;
  if (player.op) {
    return;
  }
  if (items.tnt( material ) ) {
    event.cancelled = true;
  }
}

events.blockPlace( noTNT );
