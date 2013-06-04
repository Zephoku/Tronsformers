ENGINE.Object3D = function( geometry, material ) {
  this.geometry = geometry !== undefined ? geometry : null;
  this.material = material !== undefined ? material : null;
  //material properties until material object implemented
  this.specularFactor = 0.5; //0 for no specular
  this.diffuseFactor = 0.5;

  this.color = vec4.fromValues( 0.0, 0.0, 0.0, 1.0 ); //black

  this.position = vec3.create();
  
  //Matrices
  this.matrixModel = mat4.create(); //matrix to model space
  this.matrixWorld = mat4.create(); //matrix to world space
}

ENGINE.Object3D.prototype = {
};
