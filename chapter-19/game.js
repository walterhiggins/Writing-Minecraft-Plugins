var items = require('items');
var utils = require('utils');
var scoreboard = require('minigames/scoreboard');
var cm = Packages.net.canarymod;
var cmSnowball = cm.api.entity.EntityType.SNOWBALL;
var cmCreative = cm.api.GameMode.CREATIVE;

function start( duration, teams, onGameOver ) {
  var players;
  var i;
  var game;
  var teamName;
  var ball;
  if ( typeof duration == 'undefined' ) {
    duration = 60;
  }
  if ( typeof teams == 'undefined' ) {
    teams =  {};
    players = utils.players(); 
    var teamNames = ['red','blue','yellow'];
    var playerCount = players.length;
    for ( i = 0; i < playerCount; i++ ) {
      var playerName = players[i].name;
      teamName = teamNames[ i % playerCount ];
      if (teams[ teamName ] == undefined){
        teams[ teamName ] = [];
      }
      teams[ teamName ].push(playerName);
    }
  }
  game = {
    teams: teams,
    duration: duration,
    teamScores: {},
    eventListener: null,
    onGameOver: onGameOver
  };

  function loop(){
    if ( game.duration-- ){
      updateScoreboard( game );
      setTimeout( loop, 1000 );
    } else {
      end( game );
    }
  }

  function onSnowballHit( event ) {
    var snowball = event.projectile;
    if (snowball.entityType != cmSnowball ){
      return;
    }
    var thrower = snowball.thrower;
    //var thrower = snowball.handle.j().getCanaryEntity();

    var damaged = event.entityHit;
    if (damaged == null){
      // snowball did not hit another player
      return;
    }
    var throwerTeam = getPlayerTeam( thrower, game.teams );
    var damagedTeam = getPlayerTeam( damaged, game.teams );

    if ( !throwerTeam || !damagedTeam ) {
      return; // thrower/damagee wasn't in game
    }
    if ( throwerTeam != damagedTeam ) {
      game.teamScores[ throwerTeam ]++;
    } else {
      game.teamScores[ throwerTeam ]--;
    }
  } // end onSnowballHit

  scoreboard.create('snowball', 'Snowball Fight!');
  ball = items.snowBall(1);
  
  for ( teamName in game.teams ) {

    scoreboard.addTeam( teamName, teamName );

    game.teamScores[ teamName ] = 0;
    team = game.teams[ teamName ];

    for ( i = 0; i < team.length; i++ ) {
      scoreboard.addPlayerToTeam( 'snowball', teamName, team[i]);
      player = server.getPlayer( team[i] );
      player.mode = cmCreative;
      player.inventory.addItem( ball.type.id, ball.amount, 0 );
    }
  }
  updateScoreboard(game);
  game.eventListener = events.projectileHit( onSnowballHit );
  setTimeout(loop, 1000);
}

function updateScoreboard( game ) {
  var teamName;
  var team;
  var teamScore;
  var i;

  for (teamName in game.teamScores) {
    teamScore = game.teamScores[ teamName ];
    team = game.teams[ teamName ];
    for (i = 0;i < team.length; i++){
      scoreboard.updateScore( 'snowball', team[i], teamScore);
    }
  }
}

function end( game ) {
  var teamName;
  scoreboard.remove('snowball');
  var winningTeam;
  var highestScore = 0;
  for ( teamName in game.teams ) {
    if (game.teamScores[teamName] > highestScore){
      highestScore = game.teamScores[teamName];
      winningTeam = teamName;
    }
    scoreboard.removeTeam( teamName );
  }
  server.broadcastMessage('The ' + winningTeam + ' team won!');
  game.eventListener.unregister();
  game.onGameOver( game, winningTeam );
}

function getPlayerTeam( player, teams ) {
  var teamName;
  var team;
  var i;
  if ( !player ) {
    return null;
  }
  for ( teamName in teams ) {
    team = teams[ teamName ];
    for ( i = 0; i < team.length; i++ ) {
      if ( team[i] == player.name ) {
        return teamName;
      }
    }
  }
  return null;
}

exports.start = start;
