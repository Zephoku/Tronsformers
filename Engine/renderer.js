ENGINE.Renderer = function ( args ) {
  args = args || {};

  var _canvas = args.canvas !== undefined ? args.canvas : document.createElement('canvas');
  this.canvas = _canvas;

  //private
  var _renderer = this,
      _gl
        ;


  ///////
  //METHODS
  ///////

  //main rendering function. this should be called to render stuff
  this.render = function ( scene, camera ) {
    if ( camera instanceof ENGINE.Camera === false ) {
      console.error( 'Camera passed was not a correct camera object' );
      return;
    }

    var lights = scene.lights

    //update matrices and objects
    this.initWebGLObjects( scene );

    this.renderObjects( scene.objects, camera, lights )

  };

  this.renderObjects = function ( renderList, camera, lights ) {
    for ( var i = 0; i < renderList.length; i++ ) {
      var object = renderList[i];
      var program; //TODO: get the appropriate shader

      //vertices
      _gl.bindBuffer( _gl.ARRAY_BUFFER, object.geometry.__webglVertexBuffer );
      _gl.enableVertexAttribArray( program.vPosition );
      _gl.vertexAttribPointer( program.vPosition, 3, _gl.float, false, 0, 0 );

      //normals
      _gl.bindBuffer( _gl.ARRAY_BUFFER, object.geometry.__webglNormalBuffer );
      _gl.enableVertexAttribArray( program.vNormal );
      _gl.vertexAttribPointer( program.vNormal, 3, _gl.float, false, 0, 0 );
  
      _gl.drawArrays( _gl.TRAINGLE, 0, object.geometry.faces.length );  
  };

  this.initWebGLObjects = function ( scene ) {
    while ( scene.objectsAdded.length ) {
      var object = scene.objectsAdded[0];

      //TODO: buffer stuff here of maybe another function
      
      //create the gl buffers if they don't exist
      if ( ! object.__webglVertexBuffer ) {
        this.createGeometryBuffers( object.geometry );
      }

      //bind the buffer data
      this.updateGeometryBuffers( geometry );

      
      scene.objectsAdded.splice( 0, 1 );
    }
  };

  this.createGeometryBuffers( geometry ) {
    geometry.__webglVertexBuffer = _gl.createBuffer();
    geometry.__webglNormalBuffer = _gl.createBuffer();
    //TODO: color?
  };

  this.updateGeometryBuffers( geometry ) {
    _gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
    _gl.bufferData( _gl.ARRAY_BUFFER, geometry.vertices, _gl.STATIC_DRAW );

    _gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglNormalBuffer );
    _gl.bufferData( _gl.ARRAY_BUFFER, geometry.normals, _gl.STATIC_DRAW )
  };

  //initialize the WebGL context
  this.initGL = function () {
    try {

	    if ( ! ( _gl = _canvas.getContext( 'experimental-webgl' ) ) ) {
			  throw 'Error creating WebGL context.';
		  }
		} catch ( error ) {
			console.error( error );
		}
  };
    
