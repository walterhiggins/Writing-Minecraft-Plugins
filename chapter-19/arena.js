var region = require('protection/region');  
var Drone = require('../drone/drone').Drone;
var blocks = require('blocks');
var arenas = persist('snowball-arenas', []);
var instructions = [
  'Snowball Fight',
  'In color area:',
  '/jsp snowball'
];

function snowballArena() {
  var arena = {};
  
  this.chkpt('sbarena');
  // construct team waiting areas
  this.box( blocks.wool.red, 8, 1, 8);
  this.right(8).box( blocks.wool.blue, 8, 1, 8);
  this.right(8).box( blocks.wool.yellow, 8, 1, 8);
  this.move('sbarena');
  // construct arena
  this.fwd(8);
  this.box( blocks.snow, 24, 1, 24);
  // construct some walls to make it interesting
  this.fwd( 6 ).right(3).box(blocks.snow, 10, 4, 1);
  this.right(2).up(2).box(blocks.air, 6, 1, 1);
  this.down(2).right(1).fwd(6).box(blocks.snow, 10, 4, 1);
  this.right(2).up(2).box(blocks.air, 6, 1, 1);
  this.move('sbarena');
  // construct glass wall around arena
  this.up().fwd(8).box0(blocks.glass_pane,24, 3, 24);
  this.move('sbarena');
  this.up().sign(instructions,63).right(8);
  this.sign(instructions,63).right(8).sign(instructions,63);
  // make whole area protected
  this.move('sbarena');
  this.zonemaker( null, 24, 32 );
  // store the coordinates of the blue, red and yellow 
  // waiting areas. These will be used to determine 
  // who's on each team
  var loc = this.getLocation();
  var loc2 = this.fwd(8).right(8).getLocation();
  arena.redZone = region.create(loc, loc2);

  loc = this.back(8).getLocation();
  loc2 = this.fwd(8).right(8).getLocation();
  arena.blueZone = region.create(loc, loc2);

  loc = this.back(8).getLocation();
  loc2 = this.fwd(8).right(8).getLocation();
  arena.yellowZone = region.create(loc, loc2);

  // store the locations of the red, blue and 
  // yellow spawn points
  this.move('sbarena');
  loc = this.fwd(10).right(1).getLocation();
  arena.redSpawn = { x: loc.x, z: loc.z, y: loc.y+1};

  loc = this.right(8).getLocation();
  arena.blueSpawn = { x: loc.x, z: loc.z, y: loc.y+1};

  loc = this.right(8).getLocation();
  arena.yellowSpawn = { x: loc.x, z: loc.z, y: loc.y+1};

  this.move('sbarena');
  arenas.push(arena);
}

Drone.extend( snowballArena );


