ENGINE.Light = function( position, color, intensity ) {
  this.position = position !== undefined ? vec3.fromValues( 0.0, 0.0, 0.0 );
  this.color = color !== undefined ? vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
  this.intensity = intensity !== undefined ? 1.0;
}

ENGINE.Light.prototype = {};
