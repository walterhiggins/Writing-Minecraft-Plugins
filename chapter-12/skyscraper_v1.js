var Drone = require('../drone').Drone;
var blocks = require('blocks');

function skyscraper( floors ) {
  var i = 0;
  if ( typeof floors == 'undefined' ) { 
    floors = 10; 
  }
  this.chkpt('skyscraper');
  for ( i = 0; i < floors; i++ ) {
    this          
      .box( blocks.iron, 20, 1, 20)  
      .up()       
      .box0(blocks.glass_pane, 20, 3, 20) 
      .up(3);
  }
  this.move('skyscraper');
}
Drone.extend( skyscraper );

