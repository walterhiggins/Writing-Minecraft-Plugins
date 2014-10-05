function create( a, b ){

  var result = { 
    startX: 0,
    startZ: 0,
    extentX: 0,
    extentZ: 0
  };
  if (a.x < b.x){
    result.startX = a.x;
    result.extentX = (b.x - a.x);
  } else { 
    result.startX = b.x;
    result.extentX = (a.x - b.x);
  }
  if (a.z < b.z){
    result.startZ = a.z;
    result.extentZ = (b.z - a.z);
  } else {
    result.startZ = b.z;
    result.extentZ = (a.z - b.z);
  }
  
  return result;
  
}
function contains(region, location){
  if ( ( location.x >= region.startX && 
         location.x <= (region.startX + region.extentX) 
       ) 
       &&
       ( location.z >= region.startZ && 
         location.z <= (region.startZ + region.extentZ) 
       ) 
     ) { 
    return true;
  }
  return false;
}

function getBoundingRegions(regions, location ){
  var i = 0;
  var result = [];
  for (i = 0; i < regions.length; i++ ){
    if ( contains(regions[i], location) ){
      result.push(regions[i]);
    }
  }
  return result;
}

exports.create = create;
exports.contains = contains;
exports.getBoundingRegions = getBoundingRegions;
