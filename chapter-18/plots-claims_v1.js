function claim( player, plotNumber) {
  var i ;
  var plot;
  var result = getClaim(player);
  if (result != null){
    // player already has claimed a plot
    return result;
  }
  for ( i = 0; i < store.plots.length; i++){
    plot = store.plots[i];
    if (plot.number == plotNumber){
      // is the plot already claimed by another?
      if (plot.claimedBy){
        player.sendMessage('This plot is already claimed');
        return null;
      } else { 
        plot.claimedBy = player.name;
        return plot;
      }
    }
  }
  return null;
}

function getClaim( player ){
  var i ;
  var plot;
  for ( i = 0; i < store.plots.length; i++){
    plot = store.plots[i];
    if (plot.claimedBy == player.name){
      return plot;
    }
  }
  return null;
}

exports.claim = claim;
exports.getClaim = getClaim;
