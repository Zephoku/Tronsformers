ENGINE.Geometry = function () {
  this.vertices = [];
  this.colors = [];
  this.normals = [];

  this.faces = [];
}

ENGINE.Geometry.prototype = {
  
  //computes the normal to each face and saves it in face.normal
  //adapted from three.js
  computeFaceNormals: function () {
    var cb = vec3.create(), ab = vec3.create();

    for ( var f = 0; f < this.faces.length; f++ ) {
      var face = this.faces[f];

      vec3.subtract( cb, this.vertices[face.c], this.vertices[face.b] );
      vec3.subtract( ab, this.vertices[face.a], this.vertices[face.b] );
      vec3.cross( ab, cb, ab );
      
      vec3.normalize( ab, ab );

      vec3.copy( face.normal, ab );
    }
  },

  //computes the normal for each vertex
  computeVertexNormals: function () {
    for ( var f = 0; f < this.faces.length; f++ ) {
      var face = this.faces[f];

      this.computeFaceNormals(); //TODO: add a check so we don't have to do this every time
      
      face.vertexNormals[0] = vec3.clone(  face.normal );
      face.vertexNormals[1] = vec3.clone(  face.normal );
      face.vertexNormals[2] = vec3.clone(  face.normal );

      this.normals[face.a] = vec3.clone( face.normal );
      this.normals[face.b] = vec3.clone( face.normal );
      this.normals[face.c] = vec3.clone( face.normal );
    }
  }
}
