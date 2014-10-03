var items = require('items');
var cm = Packages.net.canarymod;
var cmEnchantment = cm.api.inventory.Enchantment.Type;
var cmArrow = cm.api.entity.Arrow;
var cmPlayer = cm.api.entity.living.humanoid.Player;

function onArrowHit( event ) {
  var projectile = event.getProjectile();
  if (! (projectile instanceof cmArrow) ) {
    return; 
  }
  var shooter = projectile.getOwner();
  if (! (shooter instanceof cmPlayer) ) {
    return;
  }
  var itemInHand = shooter.getItemHeld();
  var arrowLocation = projectile.getLocation();
  if ( isEnderBow( itemInHand ) ) {
    projectile.destroy();
    shooter.teleportTo( arrowLocation );
  }
}
events.projectileHit( onArrowHit );

function isEnderBow( item ){
  if (item && ( item.getType() == items.bow() ) ) {
    var enchantment = item.getEnchantment();
    if (enchantment && 
	enchantment.getLevel() == 3 && 
	enchantment.getType() == cmEnchantment.LuckOfTheSea){
      return true;
    }
  }
  return false;
}
