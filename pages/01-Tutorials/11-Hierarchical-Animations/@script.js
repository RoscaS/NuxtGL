import { createShaderProgram } from '../../../tools/helpers';
import fragment from './@shader-fragment';
import vertex from './@shader-vertex';
import m3 from '../../../tools/m3';

let degToRad = deg => (360 - deg) * Math.PI / 180;

export default class Project {
  constructor(canvasId) {
    let canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext(canvasId);
    this.width = canvas.width;
    this.height = canvas.height;

    this.program = createShaderProgram(this.gl, vertex, fragment);

    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');

    this.resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution");
    this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.setGeometry();

    this.values = { tX: 60, tY: 40, sX: 0.85, sY: 0.85, an: 0 };
    this.color = [Math.random(), Math.random(), Math.random(), 1];

    this.drawScene();
  }

  drawScene() {
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    let size = 2;
    let type = this.gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    this.gl.vertexAttribPointer(
      this.positionLocation,
      size, type, normalize, stride, offset,
    );

    this.gl.uniform2f(this.resolutionLocation, this.width, this.height);
    this.gl.uniform4fv(this.colorLocation, this.color);

    // Compute matrices
    this.translationMatrix = m3.translation(this.values.tX, this.values.tY);
    this.rotationMatrix = m3.rotation(degToRad(this.values.an));
    this.scaleMatrix = m3.scaling(this.values.sX, this.values.sY);

    let matrix = m3.identity();

    for (let i = 0; i < 5; ++i) {
      matrix = m3.multiply(matrix, this.translationMatrix);
      matrix = m3.multiply(matrix, this.rotationMatrix);
      matrix = m3.multiply(matrix, this.scaleMatrix);

      this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

      let primitiveType = this.gl.TRIANGLES;
      let count = 18; // 6 triangles * 3 points
      offset = 0;

      this.gl.drawArrays(primitiveType, offset, count);
    }

    // Multiply matrices
    // let matrix = m3.multiply(this.projectionMatrix, this.translationMatrix);
    // matrix = m3.multiply(matrix, this.rotationMatrix);
    // matrix = m3.multiply(matrix, this.scaleMatrix);

    // Set the matrix
    this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

    let primitiveType = this.gl.TRIANGLES;
    let count = 18; // 6 triangles * 3 points
    offset = 0;

    this.gl.drawArrays(primitiveType, offset, count);
  }

  setGeometry() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        0, 0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30, 150,

        30, 0,
        100, 0,
        30, 30,
        30, 30,
        100, 0,
        100, 30,

        30, 60,
        67, 60,
        30, 90,
        30, 90,
        67, 60,
        67, 90,
      ]),
      this.gl.STATIC_DRAW,
    );
  }

}

