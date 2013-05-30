ENGINE.Shaders = {

  'basic': {

    vertexShader: [
      "attribute vec3 vPosition;",
      "attribute vec3 vNormal;",

      "uniform mat4 matrixModel;",
      "uniform mat4 matrixView;",
      "uniform mat4 matrixProjection;",

      "uniform vec4 color;",

      "void main(void) {",
          "gl_Position = matrixProjection * matrixView * matrixModel * vec4(vPosition, 1.0);",
      "}"
    ].join('\n'),

    fragmentShader: [
      "precision mediump float;",

      "uniform vec4 color;",
    
      "void main(void) {",
        "gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0);",
      "}"
    ].join('\n')
  
  }
}
