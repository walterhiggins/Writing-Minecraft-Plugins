var sounds = require('sounds');
var input = require('input');

var noises = {
  cat: sounds.catMeow,
  chicken: sounds.chickIdle,
  cow: sounds.cowIdle,
  'ender dragon': sounds.enderDragonGrowl,
  horse: sounds.horseIdle,
  pig: sounds.pigIdle,
  sheep: sounds.sheepIdle,
  wolf: sounds.wolfBark
};
function onInput( animal, player ) {
  var makeNoise = null;
  animal = animal.toLowerCase();

  if ( animal in noises ) {

    makeNoise = noises[ animal ];
    makeNoise( player.location );

  } else {

    player.sendMessage("I never heard of a " + animal);

  }
};

exports.animalSounds = function( player ) {
  input( player, 
         "What's your favorite animal" + 
         " - cat, chicken, cow, horse, pig, sheep or wolf?", 
         onInput );
};
