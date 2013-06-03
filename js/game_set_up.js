// Init Variables
var canvasDOM = document.getElementById('glCanvas');
var renderer = new ENGINE.Renderer({'canvas': canvasDOM});
var scene = new ENGINE.Scene();
var camera = new ENGINE.Camera();
var o = new ENGINE.Object3D();
var light = new ENGINE.Light();

// Lighting
light.position = vec3.fromValues( 2.0, 0.0, 0.0 );
scene.lights.push( light );

// Init
renderer.initGL();
var g = new ENGINE.Geometry();

//pyramid geometry
var index = 0;
index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );
g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );

g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );
index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

g.computeVertexNormals();

o.geometry = g;
o.color = vec4.fromValues( 1.0, 0.0, 0.0, 1.0 );
scene.addObject( o );

function update() {
  requestAnimFrame(update);

  camera.position[0] = cameraX;
  camera.position[1] = cameraY;
  camera.position[2] = cameraZ;
  camera.updateFromLookAt();
  renderer.render( scene, camera ); 
}

update();
