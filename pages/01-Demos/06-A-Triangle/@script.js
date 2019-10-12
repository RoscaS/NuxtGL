import { createShaderProgram } from '../../../tools/helpers';
import fragment from './@shader-fragment';
import vertex from './@shader-vertex';
import m3 from '../../../tools/m3';

export default class Project {
  constructor(canvasId) {
    let canvas = document.getElementById(canvasId);
    this.gl = canvas.getContext('experimental-webgl');
    this.width = canvas.width;
    this.height = canvas.height;

    this.program = createShaderProgram(this.gl, vertex, fragment);
    this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');
    this.positionAttributeLocation = this.gl.getAttribLocation(
      this.program,
      'a_position',
    );

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    this.setGeometry();

    this.scale = { x: 1, y: 1 };
    this.translation = { x: 200, y: 150 };
    this.angleInRadians = 0;

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

    // Compute the matrix
    let matrix = m3.projection(
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight,
    );
    matrix = m3.translate(matrix, this.translation.x, this.translation.y);
    matrix = m3.rotate(matrix, this.angleInRadians);
    matrix = m3.scale(matrix, this.scale.x, this.scale.y);
    this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

    let primitiveType = this.gl.TRIANGLES;
    let count = 3;
    offset = 0;
    this.gl.drawArrays(primitiveType, offset, count);
  }

  setGeometry() {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([0, -100, 150, 125, -175, 100]),
      this.gl.STATIC_DRAW,
    );
  }
}

