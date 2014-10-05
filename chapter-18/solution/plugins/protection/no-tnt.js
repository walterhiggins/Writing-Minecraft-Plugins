var items = require('items');
function noTNT( event ){
  if ( isOp( event.player) ) {
    return;
  }
  if (items.tnt( event.blockPlaced.type ) ) {
    event.setCanceled();
  }
}

events.blockPlace( noTNT );
