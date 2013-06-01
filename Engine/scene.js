ENGINE.Scene = function () {
  this.objects = [];
  this.lights = [];

  this.objectsAdded = [];
  this.objectsRemoved = [];

  this.ambientFactor = 1.0;
  this.__webglLightPosition = [];

  this.MAX_LIGHTS = 10;
}

ENGINE.Scene.prototype.addObject = function ( object ) {
  if ( object instanceof ENGINE.Light ) {
    if ( this.lights.indexOf( object ) === -1 ) {
      this.lights.push( object );
    }
  } else if ( object instanceof ENGINE.Object3D ) {
    if ( this.objects.indexOf( object ) === -1 ) {
      this.objects.push( object );
      this.objectsAdded.push( object );
    }

    //if removed, unremove it
    var i = this.objectsRemoved.indexOf( object );
		if ( i !== -1 ) {
			this.objectsRemoved.splice( i, 1 );
		}
    
  }
}

//this hasn't been implemented in the renderer yet
ENGINE.Scene.prototype.removeObject = function ( object ) {
  if ( object instanceof ENGINE.Light ) {
    var i = this.lights.indexOf( object );
		if ( i !== -1 ) {
			this.lights.splice( i, 1 );
		}
  } else if ( object instanceof ENGINE.Object3D ) {
    var i = this.objects.indexOf( object );
		if ( i !== -1 ) {
			this.objects.splice( i, 1 );
      this.objectsRemoved.push( object );
		}

    //if removed, unremove it
    var ai = this.objectsAdded.indexOf( object );
		if ( ai !== -1 ) {
			this.objectsAdded.splice( i, 1 );
		}
    
  }
}

ENGINE.Scene.prototype.setGLLightPosition = function () {
  this.__webglLightPosition = [];
  for ( var i = 0; i < this.lights.length; i++ ) {
    this.__webglLightPosition.push( this.lights[i].position[0] );
    this.__webglLightPosition.push( this.lights[i].position[1] );
    this.__webglLightPosition.push( this.lights[i].position[2] );
  }

  while ( this.__webglLightPosition.length < this.MAX_LIGHTS * 3 ) {
    this.__webglLightPosition.push( 0.0 );
  }

}
