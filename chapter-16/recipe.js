var items = require('items');
var bkEnchantment = org.bukkit.enchantments.Enchantment;
var bkShapedRecipe = org.bukkit.inventory.ShapedRecipe;

var enderBow = items.bow(1);
enderBow.addUnsafeEnchantment( bkEnchantment.LUCK, 3); 

var enderBowRecipe = new bkShapedRecipe( enderBow );

// E = ender pearl
// S = stick
// W = thread (string)

enderBowRecipe.shape([
  "ESW", 
  "SEW", 
  "ESW"
]);

enderBowRecipe.setIngredient('E', items.enderPearl());
enderBowRecipe.setIngredient('S', items.stick());
enderBowRecipe.setIngredient('W', items.string());

server.addRecipe(enderBowRecipe);
