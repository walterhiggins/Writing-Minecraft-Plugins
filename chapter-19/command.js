var region = require('protection/region');  
var fireworks = require('fireworks');
var utils = require('utils');
var cm = Packages.net.canarymod;
var cmLocation = cm.api.world.position.Location;
var game = require('./game');
var arenas = persist('snowball-arenas', []);

function snowball( params, sender ){
  var duration = 60; // seconds
  var i;
  var arena = null;
  var gameOn = false;

  var allPlayers = utils.players();
  var player;
  var teams = {red: [], blue:[], yellow:[]};
  var spawns = [];
  var spawn = null;

  for ( i = 0; i < arenas.length; i++ ) {
    arena = arenas[i];
    if ( region.contains(arena.redZone,sender.location) 
        || region.contains(arena.blueZone,sender.location) 
        || region.contains(arena.yellowZone,sender.location)
       ) {
      // game on!
      gameOn = true;
      break;
    } 
  }
  if (!gameOn){
    echo( sender, 
	  'You must issue this command while in a colored zone' );
    return;
  }

  for (i = 0;i < allPlayers.length; i++) {
    player = allPlayers[i];
    var playerLoc = player.location;
    inZone = false;
    if (region.contains( arena.redZone, playerLoc) ) {
      teams.red.push( player.name );
      inZone = arena.redSpawn;
    } else if ( region.contains( arena.blueZone, playerLoc) ) {
      teams.blue.push( player.name );
      inZone = arena.blueSpawn;
    } else if ( region.contains( arena.yellowZone, playerLoc) ) {
      teams.yellow.push( player.name );
      inZone = arena.yellowSpawn;
    } 
    if ( inZone ) {
      var spawnLoc = new cmLocation( playerLoc.world, 
                                     inZone.x, 
                                     inZone.y, 
                                     inZone.z, 
				     0, 
				     0);
      spawns.push( {
        participant: player,
        oldLocation: playerLoc,
        newLocation: spawnLoc 
      } );
    }
  }
  if ( (teams.red.length == 0 && teams.blue.length == 0)
      || (teams.red.length == 0 && teams.yellow.length == 0)
      || (teams.blue.length == 0 && teams.yellow.length == 0)
     ) {
    echo( sender, 
      'Need more than one team to play. ' + 
      'Someone needs to choose a different color.');
    return;
  }
  function returnPlayers( gameData, winningTeam) {
    var spawn;
    for (var i = 0;i < spawns.length; i++) { 
      spawn = spawns[i];
      var player = spawn.participant;
      player.teleportTo(spawn.oldLocation);
      if (gameData.teams[winningTeam].indexOf( '' + player.name) > -1) {
	fireworks.firework( spawn.oldLocation );
      }
    }
  }

  for (i = 0;i < spawns.length; i++) { 
    spawn = spawns[i];
    spawn.participant.teleportTo(spawn.newLocation);
  }
  game.start(duration, teams, returnPlayers);
}

command( snowball );
