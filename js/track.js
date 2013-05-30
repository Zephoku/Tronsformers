// Set up Video and Canvas elements
var videoInput = document.getElementById('vid');
var canvasInput = document.getElementById('compare');
var canvasOverlay = document.getElementById('overlay')
var debugOverlay = document.getElementById('debug');
var overlayContext = canvasOverlay.getContext('2d');

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
    debug :debugOverlay
});

htracker.init(videoInput, canvasInput);
htracker.start();

// Rectanlge drawn around face during detection
function drawFaceRectangle(event) {
  overlayContext.translate(event.x, event.y);
  overlayContext.rotate(event.angle-(Math.PI/2));
  overlayContext.strokeStyle = "#00CC00";
  overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
  overlayContext.rotate((Math.PI/2)-event.angle);
  overlayContext.translate(-event.x, -event.y);
}

// Update Debug Messages on Screen
function updateFaceDebugMessages(event) {
  var messagep = document.getElementById('headtrackerX');
  messagep.innerHTML = event.x;
  var messagep = document.getElementById('headtrackerY');
  messagep.innerHTML = event.y;
  var messagep = document.getElementById('headtrackerHeight');
  messagep.innerHTML = event.height;
  var messagep = document.getElementById('headtrackerWidth');
  messagep.innerHTML = event.width;
  var messagep = document.getElementById('headtrackerAngle');
  messagep.innerHTML = event.angle * 180/Math.PI;
}

// Face Detection
document.addEventListener("facetrackingEvent", function( event ) {
  // Clear Canvas
  overlayContext.clearRect(0,0,320,240);

  // Check for stable detection
  if (event.detection == "CS") {
    drawFaceRectangle(event);
    updateFaceDebugMessages(event);
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