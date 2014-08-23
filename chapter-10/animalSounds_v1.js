var sounds = require('sounds');
var input = require('input');
function onInput( animal, player ) {

  switch (animal) { 
    case 'cat': 
      player.sendMessage("A cat says 'meow'");
      sounds.catMeow(player.location);
      break;
    case 'chicken':
      player.sendMessage("A chicken says 'cluck'");
      sounds.chickenIdle(player.location);
      break;
    case 'cow':
      player.sendMessage("A cow says 'moo'");
      sounds.cowIdle(player.location);
      break;
    case 'horse':
      player.sendMessage("A horse says 'neigh'");
      sounds.horseIdle(player.location);
      break;
    case 'pig':
      player.sendMessage("A pig says 'oink'");
      sounds.pigIdle(player.location);
      break;
    case 'sheep':
      player.sendMessage("A sheep says 'baa'");
      sounds.sheepIdle(player.location);
      break;
    case 'wolf':
      player.sendMessage("A wolf says 'woof'");
      sounds.wolfBark(player.location);
      break;
    default: 
      player.sendMessage("I never heard of a " + animal);
  }
};
function animalSounds = function( player ){
  input( player, 
    "What's your favorite animal" + 
    " - cat, chicken, cow, horse, pig, sheep or wolf?", 
    onInput );
}
exports.animalSounds = animalSounds;
