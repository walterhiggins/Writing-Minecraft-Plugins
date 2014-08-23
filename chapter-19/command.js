var region = require('protection/region');  
var fireworks = require('fireworks');
var bkTeleportCause = org.bukkit.event.player
  .PlayerTeleportEvent.TeleportCause;
var bkLocation = org.bukkit.Location;
var game = require('./game');
var arenas = persist('snowball-arenas', []);

function snowball( params, sender ){
  var i;
  var arena = null;
  var gameOn = false;

  var allPlayers = bukkit.players();
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
    sender.sendMessage(
      'You must issue this command while in a colored zone'
    );
    return;
  }

  for (i = 0;i < allPlayers.length; i++) {
    player = allPlayers[i];
    inZone = false;
    if (
      region.contains( arena.redZone, player.location) 
    ) {
      teams.red.push( player.name );
      inZone = arena.redSpawn;
    } 
    else if (
      region.contains( arena.blueZone, player.location) 
    ) {
      teams.blue.push( player.name );
      inZone = arena.blueSpawn;
    } else if (
      region.contains( arena.yellowZone, player.location) 
    ) {
      teams.yellow.push( player.name );
      inZone = arena.yellowSpawn;
    } 
    if ( inZone ) {
      var spawnLoc = new bkLocation( player.location.world, 
                                     inZone.x, 
                                     inZone.y, 
                                     inZone.z);
      spawns.push( {
        participant: player,
        oldLocation: player.location,
        newLocation: spawnLoc 
      } );
    }
  }
  if ( (teams.red.length == 0 && teams.blue.length == 0)
      || (teams.red.length == 0 && teams.yellow.length == 0)
      || (teams.blue.length == 0 && teams.yellow.length == 0)
     ) {
    sender.sendMessage(
      'Need more than one team to play. ' + 
      'Someone needs to choose a different color.');
    return;
  }
  function returnPlayers() {
    var spawn;
    for (var i = 0;i < spawns.length; i++) { 
      spawn = spawns[i];
      spawn.participant.teleport(spawn.oldLocation, 
                                 bkTeleportCause.PLUGIN);
      fireworks.firework( spawn.oldLocation );
    }
  }

  for (i = 0;i < spawns.length; i++) { 
    spawn = spawns[i];
    spawn.participant.teleport(spawn.newLocation, 
                               bkTeleportCause.PLUGIN);
  }
  setTimeout(returnPlayers, 65000);
  
  game.SnowballFight(60, teams);
}

command( snowball );
