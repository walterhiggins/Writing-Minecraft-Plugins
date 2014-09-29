var utils = require('utils');
function byJumps( a, b ) {
  var aJumps = utils.stat( a, 'jump');
  var bJumps = utils.stat( b, 'jump');
  return aJumps - bJumps;
};
exports.byJumps = byJumps;
