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

      vec3.subtract( cb, face.c, face.b );
      vec3.subtract( ab, face.a, face.b );
      vec3.cross( ab, cb, ab );
      
      vec3.normalize( ab, ab );

      vec3.copy( face.normal, cb );
    }
  },

  //computes the normal for each vertex
  computeVertexNormals: function () {
    for ( var f = 0; f < this.faces.length; f++ ) {
      var face = this.faces[f];
      vec3.copy( face.vertexNormals[0], face.normal );
      vec3.copy( face.vertexNormals[1], face.normal );
      vec3.copy( face.vertexNormals[2], face.normal );

      vec3.copy( normals[face.a], face.normal );
      vec3.copy( normals[face.b], face.normal );
      vec3.copy( normals[face.c], face.normal );
    }
  }
}
