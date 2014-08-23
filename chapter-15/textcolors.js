var names = [
  'black',
  'darkblue',
  'darkgreen', 
  'darkaqua', 
  'darkred',
  'darkpurple', 
  'gold', 
  'gray', 
  'darkgray', 
  'blue',
  'green', 
  'aqua', 
  'red', 
  'lightpurple', 
  'yellow' , 
  'white'
];

function colorize( color, text ) {
  var index = names.indexOf( color );
  if (index >= 0){
    return '\xa7' + index.toString(16) + text;
  } else {
    return text;
  }
}

exports.names = names;
exports.colorize = colorize;
