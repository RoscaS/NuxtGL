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

    this.positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      'a_position',
    );
    this.colorAttributeLocation = this.gl.getAttribLocation(
      this.program,
      'a_color',
    );

    this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.setGeometry();

    this.colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.setColor();

    this.values = { tX: 200, tY: 150, sX: 1, sY: 1, an: 0 };

    this.drawScene();
  }

  drawScene() {
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    this.gl.enableVertexAttribArray(this.positionAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    let size = 2;
    let type = this.gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;

    this.gl.vertexAttribPointer(
      this.positionAttributeLocation,
      size, type, normalize, stride, offset,
    );

    this.gl.enableVertexAttribArray(this.colorAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    size = 4;

    this.gl.vertexAttribPointer(
      this.colorAttributeLocation,
      size, type, normalize, stride, offset,
    );

    // Compute the matrix
    let matrix = m3.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
    );
    matrix = m3.translate(matrix, this.values.tX, this.values.tY);
    matrix = m3.scale(matrix, this.values.sX, this.values.sY);
    matrix = m3.rotate(matrix, degToRad(this.values.an));
    this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

    let primitiveType = this.gl.TRIANGLES;
    let count = 6;
    offset = 0;

    this.gl.drawArrays(primitiveType, offset, count);
  }

  setGeometry() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        -150, -100,
        150, -100,
        -150, 100,

        150, -100,
        -150, 100,
        150, 100,
      ]),
      this.gl.STATIC_DRAW,
    );
  }

  setColor() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([
        Math.random(), Math.random(), Math.random(), 1,
        Math.random(), Math.random(), Math.random(), 1,
        Math.random(), Math.random(), Math.random(), 1,

        Math.random(), Math.random(), Math.random(), 1,
        Math.random(), Math.random(), Math.random(), 1,
        Math.random(), Math.random(), Math.random(), 1,
      ]),
      this.gl.STATIC_DRAW,
    );
  }
}

