var Drone = require('../drone/drone').Drone;
var zones = require('protection/zones');
function zonemaker( material, width, length ) {
  var startLoc = this.getLocation();
  this.chkpt('zonemaker');
  if (material != null){
    this.box0( material ,width, 1, length);
  }
  var endLoc = this
    .fwd(length - 1)
    .right(width - 1)
    .getLocation();
  zones.add(startLoc,endLoc);
  this.move('zonemaker');
}
Drone.extend(zonemaker);
