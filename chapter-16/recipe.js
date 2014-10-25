var items = require('items');
var recipes = require('recipes');
var cm = Packages.net.canarymod;
var cmEnchantment = cm.api.inventory.Enchantment.Type;
var cmItemFactory = cm.Canary.factory().itemFactory;
var cmEnderBow, cmLuck;

cmEnderBow = items.bow(1);
cmLuck = cmItemFactory.newEnchantment(cmEnchantment.LuckOfTheSea,3);
cmEnderBow.addEnchantments( [ cmLuck ] );

var enderBowRecipe = { 
  result: cmEnderBow,
  ingredients: { 
    E: items.enderPearl(1), 
    S: items.stick(1), 
    W: items.string(1) 
  },
  shape: [ 'ESW',
           'SEW',
           'ESW' ]
};

var recipe = recipes.create( enderBowRecipe );
server.addRecipe( recipe );
