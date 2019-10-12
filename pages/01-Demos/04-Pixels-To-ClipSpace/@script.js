import vertex from './@shader-vertex';
import fragment from './@shader-fragment';

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export default function (canvasId) {

  let canvas = document.getElementById(canvasId);
  let gl = canvas.getContext('experimental-webgl');

  /* INITIALIZATION */
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  let program = createProgram(gl, vertexShader, fragmentShader);


  let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  let resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


  let positions = [
    10, 20,
    80, 20,
    10, 30,

    10, 30,
    80, 20,
    80, 30,
  ];

  // Create the buffer
  let positionBuffer = gl.createBuffer();
  // Bind positionBuffer to gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Copy the data from gl.ARRAY_BUFFER into the GPU
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  /* RENDERING */

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  let size = 2;           // 2 components per iteration
  let type = gl.FLOAT;    // the data is 32bits floats
  let normalize = false;  // don't normalize the data
  let stride = 0;         // 0 = move forwart size * sizeof(type) each iter to get next position
  let offset = 0;         // start at the beginning of the buffer

  // Pass the content of gl.ARRAY_BUFFER to the
  // vertex shader attribute and free gl.ARRAY_BUFFER
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size, type, normalize, stride, offset
  );

  let primitiveType = gl.TRIANGLES;
  let count = positions.length / 2;
  offset = 0;
  // Execute the GLSL program
  gl.drawArrays(primitiveType, offset, count);
}


