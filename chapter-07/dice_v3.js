function roll( sides ) {
  var result = Math.random();
  result = result * sides;
  result = Math.floor(result);
  return result;
};
exports.roll = roll;
