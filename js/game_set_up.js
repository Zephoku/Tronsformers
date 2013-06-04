// Init Variables
var canvasDOM = document.getElementById('glCanvas');
var renderer = new ENGINE.Renderer({'canvas': canvasDOM});
var scene = new ENGINE.Scene();
var camera = new ENGINE.Camera(90, 1, 1, 1000);
var o = new ENGINE.Object3D();
var light = new ENGINE.Light();
// Cube - Environment
var envir = new ENGINE.Object3D();

// Lighting
light.position = vec3.fromValues( 100.0, 500.0, 50.0 );
scene.lights.push( light );

// Init
renderer.initGL();
// g is for pyramid coords
var g = new ENGINE.Geometry();
// cube is for boundaries of environment
var cube = new ENGINE.Geometry();
// cannonball is the geometry for a cannonball
var ball = new ENGINE.Geometry();

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

// cube/environment geometry
var index2 = 0;
// envr_size is half the length of each side of the cube
var envr_size = 500.0;
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
envir.color = vec4.fromValues( 0.53, .85, 1.0, 1.0 );
envir.drawShadow = false;

envir.initTexture( 'texture/world.png' );

var uv = envir.texture.UVs;
uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 1.0 ) );

uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 1.0 ) );

uv.push( vec3.fromValues( 0.0, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.0, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );

uv.push( vec3.fromValues( 0.0, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.0, 0.0 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );

uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 1.0 ) );

uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 0.5 ) );
uv.push( vec3.fromValues( 0.5, 1.0 ) );
uv.push( vec3.fromValues( 0.0, 1.0 ) );

envir.texture.repeat = true;

scene.addObject( envir );

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;


// Cannonball geometry
var index3 = 0;
// ball_size is the size of the canonball (size of each side -- it's a square)
var z_position = -100.0;
var x_position = 5.0
var ball_size = 2.0;
// front face
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

// back face
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position-ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position-ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

// top face
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position-ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

// bottom face
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

// right face
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position+ball_size, -ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

// left face
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position+ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position+ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, -ball_size, z_position-ball_size ));
index3 = ball.vertices.push( vec3.fromValues( x_position-ball_size, ball_size, z_position-ball_size ));
ball.faces.push( new ENGINE.Face( index3-3, index3-2, index3-1 ));

ball.computeVertexNormals();

var my_ball = new ENGINE.Object3D();
my_ball.geometry = ball;
my_ball.color = vec4.fromValues( 0.0, 0.0, 0.0, 1.0 );
my_ball.drawShadow = false;
scene.addObject( my_ball );

var my_ball_2 = new ENGINE.Object3D();
my_ball_2.geometry = ball;
my_ball_2.color = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
my_ball_2.drawShadow = false;
scene.addObject( my_ball_2 );



cannonballCarrier = [];

cannonball = function () {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.o = new ENGINE.Object3D();
  this.origMat = mat4.create();
}

function generateCannonball() {

  if (cannonballCarrier.length > 50)
    return;

  // maybe this goes here
  // var my_ball = new ENGINE.Object3D();
  // my_ball.geometry = cannonball;
  // my_ball.color = vec4.fromValues( 1.0, 1.0, 1.0, 1.0 );
  // scene.addObject( my_ball );
  // continue this

  var coinFlip = Math.floor(Math.random()*100);
  if (coinFlip > 75)
  {
    var can = new cannonball();

    can.x = Math.floor((Math.random()*100)+1) -50;
    can.y = Math.floor((Math.random()*100)+1) -50;

    can.o.geometry = ball;
    can.o.color = vec4.fromValues( 1.0, 1.0, 0.0, 1.0 );

    var transVec = vec3.create();
    transVec[0] = can.x;
    transVec[1] = can.y;
    transVec[2] = can.z;
    mat4.translate(can.o.matrixWorld, can.o.matrixWorld, transVec);
    can.origMat = mat4.clone(can.o.matrixWorld);

    // cannonball.x = Math.floor(Math.random()*100);
    // cannonball.y = Math.floor(Math.random()*100);

    cannonballCarrier.push(can);
    scene.addObject( can.o );
  }
  else 
    return;
}

function updateBalls() {
  for(var i = 0; i < cannonballCarrier.length; i++)
  {
    var transVec = vec3.create();
    transVec[0] = cannonballCarrier[i].x;
    transVec[1] = cannonballCarrier[i].y;
    transVec[2] = cannonballCarrier[i].z;
    mat4.translate(cannonballCarrier[i].o.matrixWorld, cannonballCarrier[i].origMat, transVec);
  }
}

var score = 0;
var ballRate = .25;
var isDead = false;

var origMatrix = mat4.clone(o.matrixWorld);
function update() {
  requestAnimFrame(update);
  handleKeys();

  camera.position[0] = cameraX;
  camera.position[1] = cameraY;
  camera.position[2] = cameraZ;

  var transVec = vec3.create();
  transVec[0] = userPosX;
  transVec[1] = userPosY;
  transVec[2] = userPosZ;
  mat4.translate(o.matrixWorld, origMatrix, transVec);

  generateCannonball();

  for(var i = 0; i < cannonballCarrier.length; i++)
  {
    if (cannonballCarrier[i].z > 130)
    {
      cannonballCarrier.shift();
      if(!isDead)
        score += 1;
      scene.removeObject(cannonballCarrier[i].o);
    }
    if ((Math.abs(cannonballCarrier[i].x - cameraX ) <= 2) &&
        (Math.abs(cannonballCarrier[i].y - cameraY ) <= 2) &&
        (Math.abs(cannonballCarrier[i].z - cameraZ ) <= 2) )
    {
      isDead = true;
    }
    cannonballCarrier[i].z += ballRate;

  }

  updateBalls();

  // cannon objects run at you
  // If hit z = 0; 1 point
  // If x and y = you, you die

  vec3.add(camera.lookAt, camera.lookAt, transVec);

  camera.update();
  renderer.render( scene, camera ); 
}

update();











