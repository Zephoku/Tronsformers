      // set up video and canvas elements needed
    
      var videoInput = document.getElementById('vid');
      var canvasInput = document.getElementById('compare');
      var canvasOverlay = document.getElementById('overlay')
      var debugOverlay = document.getElementById('debug');
      var overlayContext = canvasOverlay.getContext('2d');
      canvasOverlay.style.position = "absolute";
      canvasOverlay.style.top = '0px';
      canvasOverlay.style.zIndex = '100001';
      canvasOverlay.style.display = 'block';
      debugOverlay.style.position = "absolute";
      debugOverlay.style.top = '0px';
      debugOverlay.style.zIndex = '100002';
      debugOverlay.style.display = 'none';
      
      // add some custom messaging
      
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
      
      document.addEventListener("headtrackrStatus", function(event) {
        if (event.status in supportMessages) {
          var messagep = document.getElementById('gUMMessage');
          messagep.innerHTML = supportMessages[event.status];
        } else if (event.status in statusMessages) {
          var messagep = document.getElementById('headtrackerMessage');
          messagep.innerHTML = statusMessages[event.status];
        }
      }, true);
      
      // the face tracking setup
      
      var htracker = new headtrackr.Tracker({calcAngles : true, ui : true, headPosition : true, debug : debugOverlay});
      htracker.init(videoInput, canvasInput);
      htracker.start();
      
      // for each facetracking event received draw rectangle around tracked face on canvas
      
      document.addEventListener("facetrackingEvent", function( event ) {
        // clear canvas
        overlayContext.clearRect(0,0,320,240);
        // once we have stable tracking, draw rectangle
        if (event.detection == "CS") {
          overlayContext.translate(event.x, event.y)
          overlayContext.rotate(event.angle-(Math.PI/2));
          overlayContext.strokeStyle = "#00CC00";
          overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
          overlayContext.rotate((Math.PI/2)-event.angle);
          overlayContext.translate(-event.x, -event.y);

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