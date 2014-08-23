var items = require('items');
var textcolors = require('textcolors');
var bkGameMode = org.bukkit.GameMode;
var bkSnowball = org.bukkit.entity.Snowball;
var bkDisplaySlot = org.bukkit.scoreboard.DisplaySlot;

function SnowballFight( duration, teams ) {
  var players;
  var i;
  var game;
  var teamName;

  if ( typeof duration == 'undefined' ) {
    duration = 60;
  }
  if ( typeof teams == 'undefined' ) {
    teams =  {};
    players = server.onlinePlayers;
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
    savedModes: {},
    snowballs: [ items.snowBall( 64 ) ]
  };

  function loop(){
    if ( game.duration-- ){
      game.objective.displayName = 'Snowball '+game.duration;
      updateScoreboard( game );
      setTimeout( loop, 1000 );
    } else {
      end( game );
    }
  }
  function onSnowballHit( event ) {
    var snowball = event.damager;
    if ( !snowball || !( snowball instanceof bkSnowball ) ) {
      return;
    }
    var thrower = snowball.shooter;
    var damaged = event.entity;
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
  }

  start( game );
  game.eventListener = events.entityDamageByEntity( 
    onSnowballHit 
  );
  setTimeout(loop, 1000);
}

function start( game ) {
  var i;
  var teamName;
  var team;
  var player;

  /*
   Initialize the scoreboard
   */
  var scoreboard = server.scoreboardManager
    .getNewScoreboard();
  var objective = scoreboard
    .registerNewObjective('win','dummy');
  objective.displayName = ('Snowball ' + game.duration)
    .underline().bold();
  objective.displaySlot = bkDisplaySlot.SIDEBAR;
  game.objective = objective;

  /*
   put all players in survival mode and give them each 64 
   snowballs for every 20 seconds of play
   */
  for ( i = 0; i < game.duration; i += 20 ) {
    game.snowballs.push( game.snowballs[ 0 ] );
  }
  
  for ( teamName in game.teams ) {

    game.teamScores[ teamName ] = -1;
    team = game.teams[ teamName ];

    var sbTeam = scoreboard.registerNewTeam( teamName );
    sbTeam.prefix = textcolors.colorize(teamName, '');
    for ( i = 0; i < team.length; i++ ) {

      player = server.getPlayer( team[i] );
      game.savedModes[ player.name ] = player.gameMode;
      player.gameMode = bkGameMode.SURVIVAL;
      player.inventory.addItem( game.snowballs );
      player.scoreboard = scoreboard;

      sbTeam.addPlayer( player );
    }

  }
  updateScoreboard(game);
  /*
   due to a bug in Scoreboard, we need to force a refresh 
   by changing the score from -1 to 0
   */
  for ( teamName in game.teams ) {
    game.teamScores[ teamName ] = 0;
  }
  updateScoreboard(game);
}

function updateScoreboard( game ) {
  var team;
  var teamScore;
  for (team in game.teamScores){
    teamScore = game.objective.getScore( team );
    teamScore.score = game.teamScores[ team ];
  }
}

function end( game ) {
  var scores = [];
  var i;
  var teamName;
  var team;
  var player;
  var scoreboard = server.scoreboardManager
    .getMainScoreboard();
  var players = [];

  function resetScoreboard(){
    var i;
    for ( i = 0; i < players.length; i++ ) {
      players[i].scoreboard = scoreboard;
    }
    game.objective.unregister();
  }
  for ( teamName in game.teams ) {
    team = game.teams[teamName];
    for ( i = 0; i < team.length; i++ ) {
      /* 
       restore player's previous game mode 
       and take back snowballs
       */
      player = server.getPlayer( team[i] );
      player.gameMode = game.savedModes[ player.name ];
      player.inventory.removeItem( game.snowballs );
      players.push(player);
    }
  }
  game.eventListener.unregister();
  game.objective.displayName = 'GAME OVER';
  /*
   display scoreboard for 5 seconds after game ends
   */
  setTimeout(resetScoreboard, 5000);
}

function getPlayerTeam( player, teams ) {
  var teamName;
  var team;
  var i;
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

exports.SnowballFight = SnowballFight;
