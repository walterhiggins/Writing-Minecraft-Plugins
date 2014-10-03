var items = require('items');
var cm = Packages.net.canarymod;
var cmEnchantment = cm.api.inventory.Enchantment.Type;
var cmArrow = cm.api.entity.Arrow;
var cmPlayer = cm.api.entity.living.humanoid.Player;

function onArrowHit( event ) {
  var projectile = event.projectile;
  if (! (projectile instanceof cmArrow) ) {
    return; 
  }
  var shooter = projectile.owner;
  if (! (shooter instanceof cmPlayer) ) {
    return;
  }
  var itemInHand = shooter.itemHeld;

  if ( isEnderBow( itemInHand ) ) {
    projectile.destroy();
    shooter.teleportTo( projectile.location );
  }
}
events.projectileHit( onArrowHit );

function isEnderBow( item ){
  if (item && ( item.type == items.bow() ) ) {
    var enchantment = item.enchantment;
    if (enchantment && 
	enchantment.level == 3 && 
	enchantment.type == cmEnchantment.LuckOfTheSea){
      return true;
    }
  }
  return false;
}
