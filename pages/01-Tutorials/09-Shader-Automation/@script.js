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
    this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
    this.translationLocation = this.gl.getUniformLocation(this.program, 'u_translation');
    this.rotationLocation = this.gl.getUniformLocation(this.program, 'u_rotation');

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.setGeometry();

    this.values = { tX: 0, tY: 0, rX: 0, rY: 1, an: 0 };
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
    this.gl.uniform2fv(this.translationLocation, [this.values.tX, this.values.tY]);
    this.gl.uniform2fv(this.rotationLocation, [this.values.rX, this.values.rY]);

    let primitiveType = this.gl.TRIANGLES;
    let count = 18;
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

