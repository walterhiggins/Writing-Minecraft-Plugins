var utils = require('utils');
function byName( a, b ) { 
  if (a.name == b.name) {
    return 0;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
};
exports.byName = byName;

function byExp( a, b ) { 
  return a.totalExperience - b.totalExperience;
};
exports.byExperience = byExp;
exports.byExp = byExp;

function byJumps( a, b ) {
  var aJumps = utils.stat( a, 'jump');
  var bJumps = utils.stat( b, 'jump');
  return aJumps - bJumps;
};
exports.byJumps = byJumps;
