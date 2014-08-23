
var tinyDoll = { size: 'Tiny', inner: null };
var smallDoll = { size: 'Small', inner: tinyDoll };
var mediumDoll = { size: 'Medium', inner: smallDoll };
var largeDoll = { size: 'Large', inner: mediumDoll };

function openRussianDoll( doll ){
  console.log( doll.size );
  if ( doll.inner ) {
    openRussianDoll( doll.inner );
  }
}

function openDoll(){
  openRussianDoll( largeDoll );
}
exports.openDoll = openDoll;
