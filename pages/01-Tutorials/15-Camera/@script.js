import { createShaderProgram } from '../../../tools/helpers';
import fragment from './@shader-fragment';
import vertex from './@shader-vertex';
import m4 from './@matrix';

let radToDeg = r => r * 180 / Math.PI;

let degToRad = d => d * Math.PI / 180;

export default class Project {
  constructor(canvasId, store) {
    this.store = store;
    let canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext(canvasId);
    this.width = canvas.width;
    this.height = canvas.height;

    this.program = createShaderProgram(this.gl, vertex, fragment);

    this.positionLocation = this.gl.getAttribLocation(this.program,
      'a_position',
    );
    this.colorLocation = this.gl.getAttribLocation(this.program, 'a_color');

    this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.setGeometry();

    this.colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.setColors();

    this.values = {
      cameraAngle: 60,
      fov: 60,
      figures: 5,
      spread: 200,
      zNear: 1,
      zFar: 2000,
      x: 0,
      y: 0,
      z: 200,
    };

    this.dt = () => this.store.state.player.elapsed;
    this.playing = () => this.store.state.player.playing;

    this.drawScene();

    let renderLoop = () => {
      if (this.playing()) {
        this.store.commit("player/UPDATE_DT", 0.1);
        this.values.cameraAngle = this.dt();
        this.drawScene();
      }
      window.requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }

  drawScene() {
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.program);

    // Turn on the position attribute
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    let size = 3;
    let type = this.gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    this.gl.vertexAttribPointer(
      this.positionLocation,
      size, type, normalize, stride, offset,
    );

    // Turn on the color attribute
    this.gl.enableVertexAttribArray(this.colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);

    size = 3;
    type = this.gl.UNSIGNED_BYTE;
    normalize = true; // normalize the data (convert from 0-255 to 0-1)
    stride = 0;
    offset = 0;

    this.gl.vertexAttribPointer(
      this.colorLocation,
      size, type, normalize, stride, offset,
    );

    // Compute projection matrix
    let aspecRatio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    let projectionMatrix = m4.perspective(degToRad(this.values.fov), aspecRatio,
      this.values.zNear, this.values.zFar,
    );

    // Compute a matrix for the camera
    let cameraMatrix = m4.yRotation(degToRad(this.values.cameraAngle));
    cameraMatrix = m4.translate(cameraMatrix, this.values.x, this.values.y, this.values.z * 1.5);

    // Make a view matrix from the camera matrix
    let viewMatrix = m4.inverse(cameraMatrix);

    // Compute a view projection matrix
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    for (let i = 0; i < this.values.figures; ++i) {
      let angle = i * Math.PI * 2 / this.values.figures;
      let x = Math.cos(angle) * this.values.spread;
      let y = Math.sin(angle) * this.values.spread;

      // Starting with the view projection matrix
      // compute a matrix for the figures
      let matrix = m4.translate(viewProjectionMatrix, x, 0, y);

      // Set the matrix
      this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix);

      let primitiveType = this.gl.TRIANGLES;
      let count = 16 * 6;
      offset = 0;

      this.gl.drawArrays(primitiveType, offset, count);
    }
  }

  setGeometry() {
    let positions = new Float32Array([
      // left column front
      0, 0, 0,
      0, 150, 0,
      30, 0, 0,
      0, 150, 0,
      30, 150, 0,
      30, 0, 0,

      // top rung front
      30, 0, 0,
      30, 30, 0,
      100, 0, 0,
      30, 30, 0,
      100, 30, 0,
      100, 0, 0,

      // middle rung front
      30, 60, 0,
      30, 90, 0,
      67, 60, 0,
      30, 90, 0,
      67, 90, 0,
      67, 60, 0,

      // left column back
      0, 0, 30,
      30, 0, 30,
      0, 150, 30,
      0, 150, 30,
      30, 0, 30,
      30, 150, 30,

      // top rung back
      30, 0, 30,
      100, 0, 30,
      30, 30, 30,
      30, 30, 30,
      100, 0, 30,
      100, 30, 30,

      // middle rung back
      30, 60, 30,
      67, 60, 30,
      30, 90, 30,
      30, 90, 30,
      67, 60, 30,
      67, 90, 30,

      // top
      0, 0, 0,
      100, 0, 0,
      100, 0, 30,
      0, 0, 0,
      100, 0, 30,
      0, 0, 30,

      // top rung right
      100, 0, 0,
      100, 30, 0,
      100, 30, 30,
      100, 0, 0,
      100, 30, 30,
      100, 0, 30,

      // under top rung
      30, 30, 0,
      30, 30, 30,
      100, 30, 30,
      30, 30, 0,
      100, 30, 30,
      100, 30, 0,

      // between top rung and middle
      30, 30, 0,
      30, 60, 30,
      30, 30, 30,
      30, 30, 0,
      30, 60, 0,
      30, 60, 30,

      // top of middle rung
      30, 60, 0,
      67, 60, 30,
      30, 60, 30,
      30, 60, 0,
      67, 60, 0,
      67, 60, 30,

      // right of middle rung
      67, 60, 0,
      67, 90, 30,
      67, 60, 30,
      67, 60, 0,
      67, 90, 0,
      67, 90, 30,

      // bottom of middle rung.
      30, 90, 0,
      30, 90, 30,
      67, 90, 30,
      30, 90, 0,
      67, 90, 30,
      67, 90, 0,

      // right of bottom
      30, 90, 0,
      30, 150, 30,
      30, 90, 30,
      30, 90, 0,
      30, 150, 0,
      30, 150, 30,

      // bottom
      0, 150, 0,
      0, 150, 30,
      30, 150, 30,
      0, 150, 0,
      30, 150, 30,
      30, 150, 0,

      // left side
      0, 0, 0,
      0, 0, 30,
      0, 150, 30,
      0, 0, 0,
      0, 150, 30,
      0, 150, 0,
    ]);

    // Center the F around the origin and Flip it around. We do this because
    // we're in 3D now with and +Y is up where as before when we started with 2D
    // we had +Y as down.

    // We could do by changing all the values above but I'm lazy.
    // We could also do it with a matrix at draw time but you should
    // never do stuff at draw time if you can do it at init time.
    let matrix = m4.xRotation(Math.PI);
    matrix = m4.translate(matrix, -50, -75, -15);

    for (let i = 0; i < positions.length; i += 3) {
      let vector = m4.vectorMultiply(
        [positions[i + 0], positions[i + 1], positions[i + 2], 1], matrix);
      positions[i + 0] = vector[0];
      positions[i + 1] = vector[1];
      positions[i + 2] = vector[2];
    }

    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
  }

  // Fill the buffer with colors for the 'F'.
  function;

  setColors() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Uint8Array([
        // left column front
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        // top rung front
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        // middle rung front
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,
        200, 70, 120,

        // left column back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // middle rung back
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        // top
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

        // top rung right
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

        // under top rung
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

        // between top rung and middle
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

        // top of middle rung
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

        // right of middle rung
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

        // bottom of middle rung.
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

        // right of bottom
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

        // bottom
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

        // left side
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
      ]),
      this.gl.STATIC_DRAW,
    );
  }
}
