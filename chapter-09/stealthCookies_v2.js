var items = require('items');

function dropCookiesIfSneakingOrFlying( event ){
  var breaker = event.player;
  var broken = event.block;
  var isSand = items.sand(broken.type);
  if ( isSand && ( breaker.sneaking || (! breaker.onGround) ) ) {
    broken.world.dropItem(broken.position, items.cookie(2));
  }
}
events.blockDestroy( dropCookiesIfSneakingOrFlying );
