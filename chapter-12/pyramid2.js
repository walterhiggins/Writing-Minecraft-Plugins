var Drone = require('../drone').Drone;
var blocks = require('blocks');

function pyramid ( side ) {
  if ( !side ) {
    side = 30;
  }
  var i = side;
  this.chkpt('pyramid');

  while ( i > 0 ) {
    this.box( blocks.sandstone, i, 1, i)
      .up()
      .right()
      .fwd();
    i = i - 2; 
  }

  this.move('pyramid');      
}

Drone.extend( pyramid );
