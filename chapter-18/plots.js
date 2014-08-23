var store = persist( 'plots', {plotCounter: 1, plots: []} );
var region = require('./region');

function addPlot( a, b ) {
  var result = region.create(a,b);
  result.number = store.plotCounter++;
  result.claimedBy = null;
  store.plots.push(result);
  return result;
}

function getBoundingPlots( location ){
  return regions.getBoundingRegions(store.plots, location);
}

exports.add = addPlot;
exports.getBoundingPlots = getBoundingPlots;

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
