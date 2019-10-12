import vertex from './@shader-vertex';
import fragment from './@shader-fragment';

let randInt = range => Math.floor(Math.random() * range);
let randomColor = alpha => [Math.random(), Math.random(), Math.random(), alpha];

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

function setRectangle(gl, x, y, w, h) {
  let x1 = x;
  let x2 = x + w;
  let y1 = y;
  let y2 = y + h;
  let triangle1 = [x1, y1, x2, y1, x1, y2];
  let triangle2 = [x1, y2, x2, y1, x2, y2];
  let rectangle = new Float32Array([...triangle1, ...triangle2]);
  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
  gl.bufferData(gl.ARRAY_BUFFER, rectangle, gl.STATIC_DRAW)
}

function randomRectangle(xMax, yMax) {
  return [randInt(xMax), randInt(yMax), randInt(xMax), randInt(yMax)];
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
  let colorUniformLocation = gl.getUniformLocation(program, 'u_color');

  // Create the buffer
  let positionBuffer = gl.createBuffer();
  // Bind positionBuffer to gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);



  /* RENDERING */
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);


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

  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  let rectangleCount = 50;

  // Draw 50 random rectangles in random colors
  for(var i = 0; i < rectangleCount; ++i) {
    // Setup a random rectangle
    // This will write to positionBuffer because
    // its the last thing that has been bound on the
    // ARRAY_BUFFER bind point.
    setRectangle(gl, ...randomRectangle(canvas.width, canvas.height));
    // Set a random color.
    gl.uniform4f(colorUniformLocation, ...randomColor(1));

    // Draw the rectangle.
    let primitiveType = gl.TRIANGLES;
    let count = 6; // one rectangle is made of 6 points.
    let offset = 0;

    gl.drawArrays(primitiveType, offset, count);
  }
}


