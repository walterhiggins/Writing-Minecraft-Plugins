var sounds = require('sounds');
var input = require('input');
function onInput( animal, player ) {
  animal = animal.toLowerCase();
  switch (animal) { 
    case 'cat': 
      echo( player, "A cat says 'meow'");
      sounds.catMeow(player.location);
      break;
    case 'chicken':
      echo( player, "A chicken says 'cluck'");
      sounds.chickenSay(player.location);
      break;
    case 'cow':
      echo( player, "A cow says 'moo'");
      sounds.cowSay(player.location);
      break;
    case 'pig':
      echo( player, "A pig says 'oink'");
      sounds.pigSay(player.location);
      break;
    case 'sheep':
      echo( player, "A sheep says 'baa'");
      sounds.sheepSay(player.location);
      break;
    case 'wolf':
      echo( player, "A wolf says 'woof'");
      sounds.wolfBark(player.location);
      break;
    default: 
      echo( player, "I never heard of a " + animal);
  }
}
function animalSounds( player ) {
  input( player, 
         "What's your favorite animal" + 
         " - cat, chicken, cow, pig, sheep or wolf?", 
         onInput);
}
exports.animalSounds = animalSounds;

