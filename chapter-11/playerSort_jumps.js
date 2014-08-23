function byJumps( a, b ) {
  var aJumps = a.getStatistic( bukkit.stat.JUMP );
  var bJumps = b.getStatistic( bukkit.stat.JUMP );
  return aJumps - bJumps;
};
exports.byJumps = byJumps;
