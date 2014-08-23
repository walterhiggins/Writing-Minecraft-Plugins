var items = require('items');
var bkEnchantment = org.bukkit.enchantments.Enchantment;
var bkArrow = org.bukkit.entity.Arrow;
var bkPlayer = org.bukkit.entity.Player;

function onArrowHit( event ) {
  var projectile = event.getEntity();
  if (! (projectile instanceof bkArrow) ) {
    return; 
  }
  var shooter = projectile.getShooter();
  if (! (shooter instanceof bkPlayer) ) {
    return;
  }
  var itemInHand = shooter.getItemInHand();
  var arrowLocation = projectile.getLocation();
  if ( isEnderBow( itemInHand ) ) {
    projectile.remove();
    shooter.teleport( arrowLocation );
  }
}
events.projectileHit( onArrowHit );

function isEnderBow( item ){
  if (item && 
      (item.getType() == items.bow()) &&
      item.getEnchantmentLevel(bkEnchantment.LUCK) == 3){
    return true;
  }
  return false;
}

