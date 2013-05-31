//TODO: This will go in the toplevel file
var ENGINE = ENGINE || {}; 

ENGINE.Camera = function ( fov, aspect, near, far ) {

  //view attributes
  this.position = vec3.create();
  this.vAngle = 0;
  this.hAngle = Math.PI;

  //derived view attributes
  this.right = vec3.create();
  this.up = vec3.fromValues(0.0, 1.0, 0.0);
  this.direction = vec3.create();
  this.lookAt = vec3.create();

	//projection attributes
  this.fov = fov !== undefined ? fov : 50;
	this.aspect = aspect !== undefined ? aspect : 1;
	this.near = near !== undefined ? near : 0.1;
	this.far = far !== undefined ? far : 2000;

  this.matrixProjection = mat4.create();
  this.matrixView = mat4.create();

};

ENGINE.Camera.prototype = {

  //returns the right unit vector
  computeRight: function() {
    var out = vec3.fromValues(
      Math.sin( this.hAngle - Math.PI/2 ).toFixed(10),
      0,
      Math.cos( this.hAngle - Math.PI/2 ).toFixed(10)
    );
    out = vec3.normalize( out, out );
    return out;
  },

  //returns the direction unit vector based on the angles
  computeDirection: function() {
    var out = vec3.fromValues(
      Math.cos( this.vAngle ) * Math.sin( this.hAngle ).toFixed(10),
      Math.sin( this.vAngle ).toFixed(10),
      Math.cos( this.vAngle ) * Math.cos( this.hAngle ).toFixed(10)
    );
    out = vec3.normalize( out, out );
    return out;
  },

  //computes the up vector from the cross of right and direction
  computeUp: function() {
    var out = vec3.create();
    vec3.cross( out, this.right, this.direction );
    return out;
  },

  updateDerivedAttributes: function() {
    this.direction = this.computeDirection();
    this.right = this.computeRight();
    this.up = this.computeUp();
    vec3.add( this.lookAt, this.position, this.direction);
  },

  updateView: function() {
    mat4.lookAt( this.matrixView, this.position, this.lookAt, this.up);
  },

  updateProjection: function() {
    mat4.perspective( this.matrixProjection, this.fov, this.aspect,
          this.near, this.far);
  },

  //updates everything
  update: function() {
    this.updateDerivedAttributes();
    this.updateView();
    this.updateProjection();
  }

}
