ENGINE.Shaders = {

  'basic': {

    vertexShader: [
      "#define MAX_LIGHTS 4",

      "attribute vec3 vPosition;",
      "attribute vec3 vNormal;",

      "uniform mat4 matrixModel;",
      "uniform mat4 matrixView;",
      "uniform mat4 matrixProjection;",

      "uniform vec4 color;",
      "varying vec4 fColor;",

      "uniform vec3 cameraPosition;",
      "uniform vec3 lightPosition[MAX_LIGHTS];",
      //"uniform int useLight[MAX_LIGHTS];",

      "varying vec3 fN; //normal at current position",
      "varying vec3 fV; //vector from point to viewer",
      "varying vec3 fL[MAX_LIGHTS]; //vector from point to light",

      "uniform float ambientFactor;",
      "uniform float diffuseFactor;",     
      "uniform float specularFactor;",

      "void main(void) {",
        "vec4 position = vec4( vPosition, 1.0 );",
        "vec4 normal = vec4(vNormal, 0.0 );",


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

          "diffuse += max(dot(L,N),0.0) * diffuseFactor * color;",
          "specular += pow(max(dot(N,H),0.0),50.0) * specularFactor * vec4(1.0,1.0,1.0,1.0);",
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

        "fColor = ambient + diffuse + specular;",
        "fColor.a = 1.0;",

        "gl_Position = matrixProjection * matrixView * matrixModel * vec4(vPosition, 1.0);",
      "}"
    ].join('\n'),

    fragmentShader: [
      "precision mediump float;",

      "uniform vec4 color;",

      "varying vec4 fColor;",
    
      "void main(void) {",

        

        "gl_FragColor = fColor;",
      "}"
    ].join('\n')
  
  }
}
