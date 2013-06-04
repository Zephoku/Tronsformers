ENGINE.Shaders = {

  'basic': {

    vertexShader: [
      "#define MAX_LIGHTS 4",

      "attribute vec3 vPosition;",
      "attribute vec3 vNormal;",

      "attribute vec2 vTextureCoord;",
      "varying vec2 fTextureCoord;",

      "uniform mat4 matrixModel;",
      "uniform mat4 matrixView;",
      "uniform mat4 matrixProjection;",

      "uniform vec4 color;",

      "uniform vec3 cameraPosition;",
      "uniform vec3 lightPosition[MAX_LIGHTS];",
      //"uniform int useLight[MAX_LIGHTS];",

      "varying vec3 fN; //normal at current position",
      "varying vec3 fV; //vector from point to viewer",
      "varying vec3 fL[MAX_LIGHTS]; //vector from point to light",

      "varying vec4 fAmbient;",
      "varying vec4 fDiffuse;",
      "varying vec4 fSpecular;",

      "uniform float ambientFactor;",
      "uniform float diffuseFactor;",     
      "uniform float specularFactor;",

      "uniform int drawShadows;",

      "void main(void) {",
        "fTextureCoord = vTextureCoord;",
        "fAmbient = fDiffuse = fSpecular = vec4(0.0);",
        "vec4 position = vec4( vPosition, 1.0 );",
        "vec4 normal = vec4(vNormal, 0.0 );",


        "if ( drawShadows == 1 ) {",
          "mat4 sMatrix = mat4 ( lightPosition[0].y,  0.0,  0.0,  0.0,",
					"	   -lightPosition[0].x,  0.0, -lightPosition[0].z, -1.0,",
					"		0.0,  0.0,  lightPosition[0].y,  0.0,",
					"		0.0,  0.0,  0.0,  lightPosition[0].y);",

		      "gl_Position = matrixProjection * matrixView * sMatrix * matrixModel  * position;",
        "}",
        "else {",

          

          "fN = (matrixModel * normal).xyz;",
          "fV = cameraPosition - (matrixModel * position).xyz;",
          "for ( int i = 0; i < MAX_LIGHTS; i++ ) {",
            //"if ( useLight[i] == 0 ) continue;",
            "fL[i] = lightPosition[i] - (matrixModel * position).xyz;",
          "}",

          "vec3 N,V,L,H;",

          "N = normalize(fN);",
          "V = normalize(fV);",
          "vec4 ambient = ambientFactor * color;",
          "vec4 diffuse = vec4(0.0, 0.0, 0.0, 1.0);",
          "vec4 specular = vec4(0.0, 0.0, 0.0, 1.0);",
          
          "for ( int i = 0; i < MAX_LIGHTS; i++ ) {",
            //"if ( useLight[i] == 0 ) continue;",
            "L = normalize(fL[i]);",
            "H = normalize(L + V);",

            "diffuse += max(dot(L,N),0.0) * diffuseFactor;",
            "specular += pow(max(dot(N,H),0.0),50.0) * specularFactor;",
          "}",
          "if(dot(L,N) < 0.0){",
          "    specular = vec4(0.0,0.0,0.0,1.0);",
          "}",

          "if(specular.a > 1.0) {",
            "    specular[3] = 1.0;",
          "}",
          
          "if(diffuse.a > 1.0) {",
            "    diffuse.a = 1.0;",
          "}",
          
          "fAmbient = ambient;",
          "fDiffuse = diffuse;",
          "fSpecular = specular;",

          "gl_Position = matrixProjection * matrixView * matrixModel * vec4(vPosition, 1.0);",
        "}",
      "}"
    ].join('\n'),

    fragmentShader: [
      "precision mediump float;",

      "varying vec2 fTextureCoord;",

      "varying vec4 fAmbient;",
      "varying vec4 fDiffuse;",
      "varying vec4 fSpecular;",

      "uniform int useTexture;",
      "uniform sampler2D sampler;",
      "uniform vec4 color;",
      "uniform int drawShadow;",

      "void main(void) {",
        "if ( drawShadow == 1 ) {",
          "gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );",
        "}", 
        "else {",
          "vec4 lightWeight = fAmbient + fDiffuse;",
          "vec4 specular = fSpecular * vec4(1.0, 1.0, 1.0, 1.0);",

          "vec4 texColor = texture2D( sampler, fTextureCoord );",
          "vec4 fColor = useTexture == 1 ?  texColor : color;",
 
          "gl_FragColor = ( fColor* lightWeight) + specular;",
        "}",
      "}"
    ].join('\n')
  
  }
}
