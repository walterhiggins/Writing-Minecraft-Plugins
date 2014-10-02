var items = require('items');
var recipes = require('recipes');
var cm = Packages.net.canarymod;
var cmEnchantment = cm.api.inventory.Enchantment.Type;
var itemFactory = cm.Canary.factory().itemFactory;
var enderBow = items.bow(1);
var luck = itemFactory.newEnchantment(cmEnchantment.LuckOfTheSea,3);
enderBow.addEnchantments( [ luck ] );

var enderBowRecipe = { 
  result: enderBow,
  ingredients: { 
    E: items.enderPearl(1), 
    S: items.stick(1), 
    W: items.string(1) 
  },
  shape: [ 'ESW',
           'SEW',
           'ESW' ]
};

recipes.add( enderBowRecipe );

