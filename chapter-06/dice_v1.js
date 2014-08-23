function roll(){
  var result = Math.random();
  result = result * 6;
  result = Math.floor(result);
  return result;
};
exports.roll = roll;
