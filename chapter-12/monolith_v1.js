var Drone = require('../drone').Drone;
var blocks = require('blocks');

function monolith( ) {
  this.box( blocks.wool.black, 4, 9, 1);
}
Drone.extend( monolith );
