var items = require('items');
var bkEnchantment = org.bukkit.enchantments.Enchantment;
var bkArrow = org.bukkit.entity.Arrow;

function onArrowHit( event ) {
  var projectile = event.entity;
  if (! (projectile instanceof bkArrow) ) {
    return; 
  }
  var shooter = projectile.shooter;
  if (! (shooter instanceof bkPlayer) ) {
    return;
  }
  var itemInHand = shooter.itemInHand;
  if ( isEnderBow( itemInHand ) ) {
    projectile.remove();
    shooter.teleport( projectile.location );
  }
}
events.projectileHit( onArrowHit );

function isEnderBow( item ){
  if (item && 
      (item.type == items.bow()) &&
      item.getEnchantmentLevel(bkEnchantment.LUCK) == 3){
    return true;
  }
  return false;
}

