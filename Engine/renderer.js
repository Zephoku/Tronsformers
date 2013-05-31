ENGINE.Renderer = function ( args ) {
  args = args || {};

  var _canvas = args.canvas !== undefined ? args.canvas : document.createElement('canvas');
  this.canvas = _canvas;

  //private
  var _renderer = this,
      _currentProgram,
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

    _gl.clearColor(0.0, 0.0, 0.0, 1.0);
    _gl.viewport( 0, 0, _canvas.width, _canvas.height );

    var lights = scene.lights

    //update matrices and objects
    this.initWebGLObjects( scene );

    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
    
    renderObjects( scene.objects, camera, lights )

  };

  function renderObjects ( renderList, camera, lights ) {

    
    for ( var i = 0; i < renderList.length; i++ ) {
      var object = renderList[i];
      var program; //TODO: get the appropriate shader

      setProgram( object, camera );

      var program = _currentProgram;
      //vertices
      _gl.bindBuffer( _gl.ARRAY_BUFFER, object.geometry.__webglVertexBuffer );
      _gl.enableVertexAttribArray( program.vPosition );
      _gl.vertexAttribPointer( program.vPosition, 3, _gl.FLOAT, false, 0, 0 );

      //normals
      if ( program.vNormal !== -1 ) {
        _gl.bindBuffer( _gl.ARRAY_BUFFER, object.geometry.__webglNormalBuffer );
        _gl.enableVertexAttribArray( program.vNormal );
        _gl.vertexAttribPointer( program.vNormal, 3, _gl.FLOAT, false, 0, 0 );
      }
      _gl.drawArrays( _gl.TRIANGLES, 0, object.geometry.vertices.length );
    }


  };

  this.initWebGLObjects = function ( scene ) {
    while ( scene.objectsAdded.length ) {
      var object = scene.objectsAdded[0];

      //TODO: buffer stuff here of maybe another function
      
      //create the gl buffers if they don't exist
      if ( ! object.geometry.__webglVertexBuffer ) {
        createGeometryBuffers( object.geometry );
      }

      //bind the buffer data
      updateGeometryBuffers( object.geometry );

      
      scene.objectsAdded.splice( 0, 1 );
    }
  };

  function createGeometryBuffers( geometry ) {
    geometry.__webglVertexBuffer = _gl.createBuffer();
    geometry.__webglNormalBuffer = _gl.createBuffer();
    //TODO: color?
  };

  function updateGeometryBuffers( geometry ) {
    if ( !geometry.__webglVertices ) {
      geometry.__webglVertices = [];
      for ( var a = 0; a < geometry.vertices.length; a++ ) {
        geometry.__webglVertices.push( geometry.vertices[a][0] );
        geometry.__webglVertices.push( geometry.vertices[a][1] );
        geometry.__webglVertices.push( geometry.vertices[a][2] );
      }
    }

    _gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
    _gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array(geometry.__webglVertices), _gl.STATIC_DRAW );

   if ( !geometry.__webglNormals ) {
      geometry.__webglNormals = [];
      for ( var a = 0; a < geometry.vertices.length; a++ ) {
        geometry.__webglNormals.push( geometry.normals[a][0] );
        geometry.__webglNormals.push( geometry.normals[a][1] );
        geometry.__webglNormals.push( geometry.normals[a][2] );
      }
    }
    _gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglNormalBuffer );
    _gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array(geometry.__webglNormals), _gl.STATIC_DRAW )
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
    

    this.gl = _gl;

  };

  //
  //shader stuff
  //
  
  //generates the program, sets it, and sets uniforms
  function setProgram ( object, camera ) {

    if ( !object.fragmentShader || ! object.vertexShader ) {
      object.vertexShader = ENGINE.Shaders['basic'].vertexShader;
      object.fragmentShader = ENGINE.Shaders['basic'].fragmentShader;
    }

    if ( !object.program ) {
      object.program = buildProgram ( object.vertexShader, object.fragmentShader );
    }

    var program = object.program;
    if ( program !== _currentProgram ) {
      _gl.useProgram( program );
      _currentProgram = program;
    }

    //attribute stuffs
    program.vPosition = _gl.getAttribLocation( program, "vPosition" );
    program.vNormal = _gl.getAttribLocation( program, "vNormal" );

    //set the uniforms
    //

    //TODO: make this optional. no need to reset every frame

    _gl.uniform4fv( _gl.getUniformLocation(program, "color"), object.color );

    if ( !object.__webglMatrixModel ) {
      object.__webglMatrixModel = mat4.create();
      mat4.multiply( object.__webglMatrixModel, object.matrixWorld, object.matrixModel );
    }
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixModel"),
        false, object.__webglMatrixModel );
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixView"),
        false, camera.matrixView );
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixProjection"),
        false, camera.matrixProjection );

  };

  function buildProgram ( vertShader, fragShader ) {
    var program = _gl.createProgram();
    
    var frag_prefix = "";
    var vert_prefix = "";
   
    var glVertexShader = getShader( "vertex", vert_prefix + vertShader );
    var glFragmentShader = getShader( "fragment", frag_prefix + fragShader );

    _gl.attachShader( program, glVertexShader );
		_gl.attachShader( program, glFragmentShader );

    _gl.linkProgram( program );
    if ( !_gl.getProgramParameter( program, _gl.LINK_STATUS ) ) {
			console.error( "Could not initialise shader\n" + "VALIDATE_STATUS: " + _gl.getProgramParameter( program, _gl.VALIDATE_STATUS ) + ", gl error [" + _gl.getError() + "]" );
		}

    _gl.deleteShader( glFragmentShader );
		_gl.deleteShader( glVertexShader );

     

    return program;
  
  };

  //compiles shader from a string
	function getShader ( type, string ) {
		
    var shader;

		if ( type === "fragment" ) {
			shader = _gl.createShader( _gl.FRAGMENT_SHADER );
		} else if ( type === "vertex" ) {
			shader = _gl.createShader( _gl.VERTEX_SHADER );
		}

		_gl.shaderSource( shader, string );
		_gl.compileShader( shader );

		if ( !_gl.getShaderParameter( shader, _gl.COMPILE_STATUS ) ) {
			console.error( _gl.getShaderInfoLog( shader ) );
			return null;
		}

		return shader;

  };

};  
