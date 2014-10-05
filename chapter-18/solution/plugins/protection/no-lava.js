var items = require('items');
function noLava( event ){
  if ( isOp( event.player) ) {
    return;
  }
  if (items.lavaBucket( event.item ) ) { 
    event.setCanceled();
  }
}

events.itemUse( noLava );
