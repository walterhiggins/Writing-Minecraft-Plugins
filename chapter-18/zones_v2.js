var region = require('./region');
var store = persist( 'zones', [] );

function addZone( a, b ){
  var result = region.create(a,b);
  store.push(result);
  return result;
}
function getBoundingZones( location ){
  return region.getBoundingRegions(store, location);
}

exports.add = addZone;
exports.getBoundingZones = getBoundingZones;

