var fireworks = require('fireworks');
function fireworkshow (location){
  function launch(){
    fireworks.firework(location);
  }
  setTimeout(launch, 2000);
}

exports.fireworkshow = fireworkshow;
