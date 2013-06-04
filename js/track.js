// Set up Video and Canvas elements
var videoInput = document.getElementById('vid');
var canvasInput = document.getElementById('compare');
var canvasOverlay = document.getElementById('overlay')
var debugOverlay = document.getElementById('debug');
var overlayContext = canvasOverlay.getContext('2d');

// Control Variables
var cameraX = 0;
var cameraY = 10;
var cameraZ = 20.0;

var userPosX = 3;
var userPosY = 12;
var userPosZ = 3;

// Custom Messages
statusMessages = {
  "getUserMedia" : "getUserMedia seems to be supported",
  "camera found" : "camera found and allowed to stream",
  "whitebalance" : "initialized detection of graylevels",
  "detecting" : "initialized detection of face",
  "hints" : "detecting the face took more than 5 seconds",
  "found" : "face detected, tracking initialized",
  "redetecting" : "trying to redetect face",
  "stopped" : "face tracking was stopped"
};

supportMessages = {
  "no getUserMedia" : "getUserMedia seems not to be supported",
  "lost" : "lost tracking of face",
  "no camera" : "camera not found, or streaming not allowed, or getUserMedia setup failed"
};

// Update status and errors on html
document.addEventListener("headtrackrStatus", function(event) {
  if (event.status in supportMessages) {
    var messagep = document.getElementById('gUMMessage');
    messagep.innerHTML = supportMessages[event.status];
  } else if (event.status in statusMessages) {
    var messagep = document.getElementById('headtrackerMessage');
    messagep.innerHTML = statusMessages[event.status];
  }
}, true);

// Headtrackr Init
var htracker = new headtrackr.Tracker({
  ui: true, 
    calcAngles: true, 
    headPosition: true, 
    debug :debugOverlay,
    fadeVideo: true
});

htracker.init(videoInput, canvasInput);
htracker.start();

// Rectanlge drawn around face during detection
function drawFaceRectangle(event) {
  overlayContext.translate(event.x, event.y);
  overlayContext.rotate(event.angle-(Math.PI/2));
  overlayContext.strokeStyle = "#777";
  overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
  overlayContext.rotate((Math.PI/2)-event.angle);
  overlayContext.translate(-event.x, -event.y);
}

// Update Debug Messages on Screen
function updateFaceDebugMessages(event) {
  var messagep = document.getElementById('headtrackerX');
  messagep.innerHTML = cameraX;
  var messagep = document.getElementById('headtrackerY');
  messagep.innerHTML = cameraY;
  var messagep = document.getElementById('headtrackerZ');
  messagep.innerHTML = cameraZ;
  var messagep = document.getElementById('headtrackerHeight');
  messagep.innerHTML = event.height;
  var messagep = document.getElementById('headtrackerWidth');
  messagep.innerHTML = event.width;
  var messagep = document.getElementById('headtrackerAngle');
  messagep.innerHTML = event.angle * 180/Math.PI;
  // var messagep = document.getElementById('turningAngle');
  // messagep.innerHTML = turningAngle(event);
  // var messagep = document.getElementById('speed');
  // messagep.innerHTML = speed(event);

}

function updateCameraMovement(event){
  cameraX = Math.floor((160 - event.x) );
  cameraY = Math.floor((170 - event.y) );
  cameraZ = Math.floor(250/event.width *10);
}


var currentlyPressedKeys = {};

function handleKeyDown(event) {
  currentlyPressedKeys[event.keyCode] = true;

  if (String.fromCharCode(event.keyCode) == "F") {

  }
}


function handleKeyUp(event) {

  currentlyPressedKeys[event.keyCode] = false;
}


function handleKeys() {
  if (currentlyPressedKeys[65]) {
    // Left cursor key
    userPosX -= 1;
  }
  if (currentlyPressedKeys[68]) {
    // Right cursor key
    userPosX += 1;
  }
  if (currentlyPressedKeys[87]) {
    // Up cursor key
    userPosZ += 1;
  }
  if (currentlyPressedKeys[83]) {
    // Down cursor key
    userPosZ -= 1;
  }
}
// Face Detection
document.addEventListener("facetrackingEvent", function( event ) {
  // Clear Canvas
  overlayContext.clearRect(0,0,320,240);

  // Check for stable detection
  if (event.detection == "CS") {
    // Debug callbacks
    drawFaceRectangle(event);
    updateFaceDebugMessages(event);

    // Camera movement
    updateCameraMovement(event);

    var messagep = document.getElementById('score');
    if (isDead)
    {
      messagep.innerHTML = "YOU ARE DEAD. Final Score: " + score;
      stop();
    }
    else
      messagep.innerHTML = score;
      


  }
});

// turn off or on the canvas showing probability
function showProbabilityCanvas() {
  var debugCanvas = document.getElementById('debug');
  if (debugCanvas.style.display == 'none') {
    debugCanvas.style.display = 'block';
  } else {
    debugCanvas.style.display = 'none';
  }
}
