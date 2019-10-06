import vertex_script from './@shader-vertex';
import fragment_script from './@shader-fragment';
import { mat4 } from 'gl-matrix';

export default function (canvasId, width, height) {

  let vertices = [];
  let colors = [];
  let indexes = [];

  let vertexBuffer;
  let fragmentBuffer;
  let indexBuffer;

  let vertexShader;
  let fragmentShader;
  let shaderProgram;

  let mvMatrix = mat4.create(); // Model-view matrix
  let pMatrix = mat4.create();  // Projection matrix

  /* Step1: Prepare the canvas and get WebGL context */

  let canvas = document.getElementById(canvasId);
  let gl = canvas.getContext(canvasId);



  /* Step2: Define the geometry and store it in buffer objects */
  vertices.push(-1.0, -1.0, 0.0); // Bottom left vertex
  vertices.push(1.0, -1.0, 0.0); // Bottom right vertex
  vertices.push(0.0, 1.0, 0.0); // Top vertex

  // Create a new buffer object
  vertexBuffer = gl.createBuffer();
  // Bind an empty array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Pass the vertices data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);



  colors.push(1.0, 0.0, 0.0, 1.0); // Bottom left corner
  colors.push(0.0, 1.0, 0.0, 1.0); // Bottom right corner
  colors.push(0.0, 0.0, 1.0, 1.0); // Top corner

  // Create a new buffer object
  fragmentBuffer = gl.createBuffer();
  // Bind an empty array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, fragmentBuffer);
  // Pass the vertices data to the buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);



  indexes.push(0, 1, 2);

  // Create a new buffer object
  indexBuffer = gl.createBuffer();
  // Bind an empty array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // Pass the vertices data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
  // Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);





  /* Step3: Create and compile Shader programs */

  //Create a vertex shader object
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  //Attach vertex shader source code
  gl.shaderSource(vertexShader, vertex_script);
  //Compile the vertex shader
  gl.compileShader(vertexShader);



  //Create a fragment shader object
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  //Attach fragment shader source code
  gl.shaderSource(fragmentShader, fragment_script);
  //Compile the fragment shader
  gl.compileShader(fragmentShader);



  // Create a shader program object to store combined shader program
  shaderProgram = gl.createProgram();
  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertexShader);
  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragmentShader);
  // Link both programs
  gl.linkProgram(shaderProgram);
  // Use the combined shader program object
  gl.useProgram(shaderProgram);





  /* Step 4: Associate the shader programs to buffer objects */
  // Bridges between CPU (JS) and GPU (Shaders)


  // Geometry, related to "attribute" type qualifier inside shaders program
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(
    shaderProgram,
    'aVertexPosition',
  );
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);


  // Colors, related to "attribute" type qualifier inside shaders program
  shaderProgram.colorAttribute = gl.getAttribLocation(
    shaderProgram,
    'aColor'
  );
  gl.enableVertexAttribArray(shaderProgram.colorAttribute);

  // Transform matrix, related to "uniform" type qualifier inside shader program
  shaderProgram.pMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    'uPMatrix'
  );

  // Transform matrix, related to "uniform" type qualifier inside shader program
  shaderProgram.mvMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    'uMVMatrix'
  );



  /* Step5: Drawing the required object */

  function drawScene() {

    // Clear the canvas
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    // Render polygones in their depth order (Z-buffer)
    gl.enable(gl.DEPTH_TEST);
    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Map the final projection to canvas size
    gl.viewport(0, 0, width, height);

    // Build perspective

    // Transformation matrices
    mat4.identity(pMatrix);
    mat4.identity(mvMatrix);
    // Morph basic projection matrix to perspective matrix
    // mat4.perspective(60, c_width / c_height, 0.1, 10000.0, pMatrix)

    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

    // Define vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3,
      gl.FLOAT, false, 0, 0,
    );

    // Related colours
    gl.bindBuffer(gl.ARRAY_BUFFER, fragmentBuffer);
    gl.vertexAttribPointer(shaderProgram.colorAttribute, 4,
      gl.FLOAT, false, 0, 0,
    );

    // Links between vertice
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // Type of shape declaration
    gl.drawElements(gl.TRIANGLES, indexes.length,
      gl.UNSIGNED_SHORT, 0,
    );

    window.requestAnimationFrame(drawScene);
  }

  drawScene()
}


