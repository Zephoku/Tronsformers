ENGINE.Object3D = function( geometry, material ) {
  this.geometry = geometry !== undefined ? geometry : null;
  this.material = material !== undefined ? material : null;

  this.color = vec4.fromValues( 0.0, 0.0, 0.0, 1.0 ); //black

  this.position = vec3.create();
  
  //Matrices
  this.matrixModel = mat4.create(); //matrix to model space
  this.matrixWorld = mat4.create(); //matrix to world space
}

ENGINE.Object3D.prototype = {};
