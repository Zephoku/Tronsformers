ENGINE.Object3D = function() {
  this.vertices = null;
  this.color = vec3.fromValues( 0.0, 0.0, 0.0, 1.0 ); //black

  this.position = vec3.create();
  
  //Matrices
  this.modelMatrix = mat4.create(); //matrix to model space
  this.worldMatrix = mat4.create(); //matrix to world space
}

ENGINE.Object3D.prototype = {};
