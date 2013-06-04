ENGINE.Face = function ( a, b, c ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.normal = vec3.create();
	this.vertexNormals = [];

	this.color = vec4.fromValues(0.0, 0.0, 0.0, 1.0);
	this.vertexColors = [];

}

ENGINE.Face.prototype.clone = function () {
  var nf = new ENGINE.Face();
  nf.a = this.a;
  nf.b = this.b;
  nf.c = this.c;
  
  nf.color = vec4.clone( this.color );

  return nf;
}
