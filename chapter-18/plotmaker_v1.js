var Drone = require('../drone/drone').Drone;
var plots = require('protection/plots');
function plotmaker( material, width, length ) {
  var startLoc = this.getLocation();
  this.chkpt('plotmaker');
  this.box0( material ,width, 1, length);
  var endLoc = this
    .fwd(length - 1)
    .right(width - 1)
    .getLocation();

  var plot = plots.add(startLoc,endLoc);
  this.move('plotmaker');
  var claimMesg = [
    '#' + plot.number + ' (' + width + ' X ' + length + ')',
    'To claim:',
    '1. move inside',
    '2. /jsp claim '
  ];
  this.up().sign(claimMesg,63).down();
}
Drone.extend(plotmaker);
