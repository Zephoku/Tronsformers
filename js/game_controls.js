function updateCameraMovement(event){
  cameraX += (170 - event.x) *.001;
  cameraY += (145 - event.y) *.001;
  cameraZ += event.height/event.width * 5;
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
  }
});

