// Init Variables
var canvasDOM = document.getElementById('glCanvas');
var renderer = new ENGINE.Renderer({'canvas': canvasDOM});
var scene = new ENGINE.Scene();
var camera = new ENGINE.Camera(90, 1, 1, 1000);
var o = new ENGINE.Object3D();
var light = new ENGINE.Light();
// Cube
var envir = new ENGINE.Object3D();

// Lighting
light.position = vec3.fromValues( 2.0, 0.0, 0.0 );
scene.lights.push( light );

// Init
renderer.initGL();
// g is for pyramid coords
var g = new ENGINE.Geometry();
// cube is for boundaries of environment
var cube = new ENGINE.Geometry();

//pyramid geometry
// var index = 0;
// index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
// index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
// index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );
// g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

// index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
// index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
// index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
// g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

// index = g.vertices.push( vec3.fromValues( 0.0, 0.0, 1.0 ) );
// index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
// index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );
// g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

// index = g.vertices.push( vec3.fromValues( 1.0, 0.0, -1.0 ) );
// index = g.vertices.push( vec3.fromValues( -1.0, 0.0, -1.0 ) );
// index = g.vertices.push( vec3.fromValues( 0.0, 1.0, 0.0 ) );
// g.faces.push( new ENGINE.Face( index-3, index-2, index-1 ) );

// g.computeVertexNormals();

// o.geometry = g;
// o.color = vec4.fromValues( 1.0, 0.0, 0.0, 1.0 );
// scene.addObject( o );

// cube/environment geometry
var index2 = 0;
// envr_size is half the length of each side of the cube
var envr_size = 100.0;
// height of camera above the ground
var cam_height = 3.0;
// front face
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

// back face
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, -envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, -envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

// top face
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, -envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

// bottom face
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

// right face
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, 2*envr_size, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( envr_size, -cam_height, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

// left face
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

index2 = cube.vertices.push( vec3.fromValues( -envr_size, -cam_height, -envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, envr_size ));
index2 = cube.vertices.push( vec3.fromValues( -envr_size, 2*envr_size, -envr_size ));
cube.faces.push( new ENGINE.Face( index2-3, index2-2, index2-1 ));

cube.computeVertexNormals();

envir.geometry = cube;
envir.color = vec4.fromValues( 0.0, 1.0, 0.0, 1.0 );
scene.addObject( envir );



function update() {
  requestAnimFrame(update);

  camera.position[0] = cameraX;
  camera.position[1] = cameraY;
  camera.position[2] = cameraZ;

  camera.lookat = o.position;
  camera.update();
  camera.updateFromLookAt();
  renderer.render( scene, camera ); 
}

update();











