// Turning Angle
// Derived from the angle of head
function turningAngle(event) {
  return (-1 * (event.angle * 180/Math.PI - 90));
}

// Speed
// Derived from the size of your head (proximity from the webcam)
// 100 is the base speed
// 140 is the base height
function speed(event) {
  return (100 + 1*(event.height - 140));
}

// this is just for display purposes
function updateUserControl(event) {
  var messagep = document.getElementById('speed');
  messagep.innerHTML = speed(event);
  var messagep = document.getElementById('turningAngle');
  messagep.innerHTML = turningAngle(event);
}

// this function updates the user position and rerenders
function updateUserPosition(event) {

}







