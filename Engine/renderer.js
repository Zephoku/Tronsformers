ENGINE.Renderer = function ( args ) {
  args = args || {};

  var _canvas = args.canvas !== undefined ? args.canvas : document.createElement('canvas');
  this.canvas = _canvas;

  //private
  var _renderer = this,
      _drawShadows = false,
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

    _gl.clearColor(1.0, 1.0, 1.0, 1.0);
    _gl.viewport( 0, 0, _canvas.width, _canvas.height );
    _gl.enable(_gl.DEPTH_TEST);

    var lights = scene.lights

    //update matrices and objects
    this.initWebGLObjects( scene );

    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);
    
    renderObjects( scene.objects, scene, camera, lights );

    _drawShadows = 1;
    renderObjects( scene.objects, scene, camera, lights );
    _drawShadows = 0;

  };

  function renderObjects ( renderList, scene, camera, lights ) {

    
    for ( var i = 0; i < renderList.length; i++ ) {
      var object = renderList[i];
      var program; //TODO: get the appropriate shader

      if ( object.texture ) {
        if ( !object.texture.__webglTexture )
          initTexture( object );
        bindTexture ( object.texture ); 
      }

      setProgram( scene, object, camera );

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

      //texture coords
      if ( object.texture ) {
        _gl.bindBuffer( _gl.ARRAY_BUFFER, object.texture.__webglUVBuffer );
        _gl.enableVertexAttribArray( program.vTextureCoord );
        _gl.vertexAttribPointer( program.vTextureCoord, 2, _gl.FLOAT, false, 0, 0 );
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
        createBuffers( object );
      }

      //bind the buffer data
      updateBuffers( object );

      
      scene.objectsAdded.splice( 0, 1 );
    }
  };

  function createBuffers( object ) {
    var geometry = object.geometry;

    geometry.__webglVertexBuffer = _gl.createBuffer();
    geometry.__webglNormalBuffer = _gl.createBuffer();

    if ( object.texture !== undefined ) {
      object.texture.__webglUVBuffer = _gl.createBuffer();
    }

    //TODO: color?
  };

  function updateBuffers( object ) {
    var geometry = object.geometry

    if ( !geometry.__webglVertices ) {
      console.log( object );
      console.log( object.geometry );
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

    if ( object.texture ) {
      var texture = object.texture
    
      if ( !texture.__webglUVs ) {
        texture.__webglUVs = [];
        for ( var a = 0; a < texture.UVs.length; a++ ) {
          texture.__webglUVs.push( texture.UVs[a][0] );
          texture.__webglUVs.push( texture.UVs[a][1] );
        }
      }
      _gl.bindBuffer( _gl.ARRAY_BUFFER, texture.__webglUVBuffer );
      _gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array(texture.__webglUVs), _gl.STATIC_DRAW )
  }

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
  //texture stuff
  //
  
  function initTexture ( object ) {
    var texture = object.texture;
    if ( !texture.__webglTexture ) {
      texture.__webglTexture = _gl.createTexture();
      _gl.bindTexture(_gl.TEXTURE_2D, texture.__webglTexture);
      _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
      _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
      
      if ( !texture.textureSet ) {
        texture.__webglTexture.image = texture.image;
        if ( texture.image.loaded ) {
          setTexture( texture );
        }
        else {
          texture.__webglTexture.image.onload = function () { setTexture( texture ); };
        }
      }
    }
  };

  function setTexture ( textureObject ) {
    var texture = textureObject.__webglTexture;

    _gl.bindTexture(_gl.TEXTURE_2D, texture);
    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, textureObject.image);
    textureObject.textureSet = true;
  };

  function bindTexture ( textureObject ) {
    var texture = textureObject.__webglTexture;

    _gl.activeTexture( _gl.TEXTURE0 );
    _gl.bindTexture( _gl.TEXTURE_2D, texture );
  };


  //
  //shader stuff
  //
  
  //generates the program, sets it, and sets uniforms
  function setProgram ( scene, object, camera ) {

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
    program.vTextureCoord = _gl.getAttribLocation( program, "vTextureCoord" );

    //set the uniforms
    //

    //TODO: make this optional. no need to reset every frame
    //TODO: modularize this

    _gl.uniform4fv( _gl.getUniformLocation(program, "color"), object.color );

    if ( !object.__webglMatrixModel ) {
      object.__webglMatrixModel = mat4.create();
    }
    mat4.multiply( object.__webglMatrixModel, object.matrixWorld, object.matrixModel );
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixModel"),
        false, object.__webglMatrixModel );
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixView"),
        false, camera.matrixView );
    _gl.uniformMatrix4fv( _gl.getUniformLocation(program, "matrixProjection"),
        false, camera.matrixProjection );

    //lighting
    _gl.uniform1f( _gl.getUniformLocation(program, "ambientFactor"),
        scene.ambientFactor );
    _gl.uniform1f( _gl.getUniformLocation(program, "specularFactor"),
        object.specularFactor );
    _gl.uniform1f( _gl.getUniformLocation(program, "diffuseFactor"),
        object.diffuseFactor );
    _gl.uniform1i( _gl.getUniformLocation(program, "numLights"),
        scene.lights.length );

    scene.setGLLightPosition();
    _gl.uniform3fv( _gl.getUniformLocation(program, "lightPosition"),
        new Float32Array( scene.__webglLightPosition ) );
    _gl.uniform3fv( _gl.getUniformLocation(program, "cameraPosition"),
        camera.position );

    //textures
    var useTex = object.texture && object.texture.__webglTexture ? 1 : 0;
    _gl.uniform1i( _gl.getUniformLocation(program, "useTexture"),
      useTex );
    if ( useTex ) {
      _gl.uniform1i( _gl.getUniformLocation(program, "sampler"),
        object.texture.sampler );
    }

    //shadows
    _gl.uniform1i( _gl.getUniformLocation(program, "drawShadows"),
      _drawShadows ) 

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
