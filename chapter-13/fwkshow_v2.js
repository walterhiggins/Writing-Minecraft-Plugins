var fireworks = require('fireworks');
function fireworkshow( location, count ) {
  
  function launch( ){
    fireworks.firework( location );
    count = count - 1;
    if ( count > 0 ) {
      setTimeout( launch, 2000 );
    }
  }

  setTimeout( launch, 2000 );
}

exports.fireworkshow = fireworkshow;
