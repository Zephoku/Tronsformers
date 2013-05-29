ENGINE.Light = function( position, color ) {
  this.position = position !== undefined ? vec3.fromValues( 0.0, 0.0, 0.0 );
  this.color = color !== undefined ? vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
}


