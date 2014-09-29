var sounds = require('sounds');
var input = require('input');

var noises = {
  cat: sounds.catMeow,
  chicken: sounds.chickenSay,
  cow: sounds.cowSay,
  'ender dragon': sounds.enderdragonGrowl,
  pig: sounds.pigSay,
  sheep: sounds.sheepSay,
  wolf: sounds.wolfBark
};
function onInput( animal, player ) {
  var makeNoise = null;
  animal = animal.toLowerCase();

  if ( animal in noises ) {

    makeNoise = noises[ animal ];
    makeNoise( player.location );

  } else {

    echo( player, "I never heard of a " + animal);

  }
};

exports.animalSounds = function( player ) {
  input( player, 
         "What's your favorite animal" + 
         " - cat, chicken, cow, ender dragon, pig, sheep or wolf?",
         onInput );
};
