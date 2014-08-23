var items = require('items');
var bkEnchantment = org.bukkit.enchantments.Enchantment;
var bkTeleportCause = org.bukkit.event.player
      .PlayerTeleportEvent.TeleportCause;
function isEnderBow( item ){
  if (item && 
      (item.type == items.bow()) &&
      item.getEnchantmentLevel(bkEnchantment.LUCK) == 3){
    return true;
  }
  return false;
}

function onArrowHit( event ) {
  var arrow = event.entity;
  var shooter = arrow.shooter;
  var itemInHand = shooter.itemInHand;
  if ( isEnderBow( itemInHand ) ) {
    arrow.remove();
    shooter.teleport(arrow.location, bkTeleportCause.PLUGIN);
  }
}
events.projectileHit( onArrowHit );
