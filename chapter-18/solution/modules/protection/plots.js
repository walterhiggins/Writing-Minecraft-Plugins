var region = require('./region');
var store = persist( 'plots', {plotCounter: 1, plots: []} );

function addPlot( a, b ) {
  var result = region.create(a,b);
  result.number = store.plotCounter++;
  result.claimedBy = null;
  result.sharedWith = [];
  store.plots.push(result);
  return result;
}

function getBoundingPlots( location ){
  return region.getBoundingRegions(store.plots, location);
}

function removeAllPlots(){
  store.plots.length = 0;
}

exports.add = addPlot;
exports.getBoundingPlots = getBoundingPlots;
exports.removeAllPlots = removeAllPlots;
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
        echo( player, 'This plot is already claimed');
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
