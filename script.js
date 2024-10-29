// Vertex-Shader program
const vsSource = `
    attribute vec2 aVertexPosition;
    void main(void) {
        gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    }
`;

// Fragment-Shader program
const fsSource = `
    void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
`;

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // check shader build
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function getHandPositions(fingerLength = 0.7) {
  return [
    // Handfläche
    0.0, 0.0,    -0.2, 0.1,   -0.3, 0.4,  -0.25, 0.45,  -0.2, 0.4,   -0.17, 0.3,
    // Zeigefinger
    -0.15, 0.4,  -0.15, 0.62,  -0.1, 0.67,  -0.05, 0.62,   -0.05, 0.4,
    // Mittelfinger
    -0.05, 0.4,  -0.05, fingerLength,   0.0, fingerLength + 0.05,   0.05, fingerLength,    0.05, 0.4,
    // Ringfinger
    0.05, 0.4,   0.05, 0.62,   0.1, 0.67,   0.15, 0.62,    0.15, 0.4,
    // Kleiner Finger
    0.15, 0.4,   0.15, 0.5,   0.2, 0.55,   0.24, 0.5,    0.24, 0.4,
    // Handfläche
    0.2, 0.1
  ];
}

function initBuffers(gl, fingerLength) {
  // buffers for the positions
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = getHandPositions(fingerLength);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.9, 0.9, 0.9, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  {
    const numComponents = 2; // x und y
    const type = gl.FLOAT; // Daten sind 32-Bit-Gleitkommazahlen
    const normalize = false;
    const stride = 0; // Wie viele Bytes von einem Satz von Werten zum nächsten
    const offset = 0; // Offset in den Puffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // Verwenden des Shader-Programms
  gl.useProgram(programInfo.program);

  {
    const offset = 0;
    const vertexCount = 27; // Anzahl der Vertices
    gl.drawArrays(gl.LINE_STRIP, offset, vertexCount);
  }
}

function main(fingerLength = 0.7) {
  const canvas = document.getElementById('glCanvas');
  let gl = canvas.getContext('webgl');

  // WebGL availability check
  if (!gl) {
    console.error('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
    alert('Your browser does not support WebGL');
    return;
  }

  // init shader
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
  };

  // init buffer
  const buffers = initBuffers(gl, fingerLength);

  drawScene(gl, programInfo, buffers);
}

window.onload = () => {
  const fingerLengthInput = document.getElementById('fingerLength');
  const fingerLengthValue = document.getElementById('fingerLengthValue');

  fingerLengthInput.addEventListener('input', (event) => {
    const fingerLength = parseFloat(event.target.value);
    fingerLengthValue.textContent = fingerLength.toFixed(2);
    main(fingerLength);
  });

  main(parseFloat(fingerLengthInput.value));
};
