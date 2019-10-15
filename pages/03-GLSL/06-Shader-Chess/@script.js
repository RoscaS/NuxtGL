import { createShaderProgram, degToRad } from '../../../tools/helpers';
import { mat4, mat3 } from 'gl-matrix';
import fragment from './@shader-fragment';
import vertex from './@shader-vertex';
import { toRadian } from 'gl-matrix/cjs/common';

export default class Project {

  constructor(canvasId, store) {
    let canvas = document.getElementById(canvasId);
    // Autocompletion workaround
    let gl = canvas.getContext('webgl');
    this.gl = gl;

    this.width = canvas.width;
    this.height = canvas.height;
    this.program = createShaderProgram(this.gl, vertex, fragment);
    this.store = store;

    this.initGeometry();
    this.initAttributes();
    this.initBuffers();
    this.initValues();

    this.drawScene();
    this.renderLoop();
  }

  /*------------------------------------------------------------------*\
   |*							              GET/SET
   \*------------------------------------------------------------------*/

  get dt() { return this.store.state.player.dt; }

  get isPlaying() { return this.store.state.player.playing; }

  updateDt(t) { this.store.commit('player/UPDATE_DT', t); }

  /*------------------------------------------------------------------*\
   |*							            INITIALIZATION
   \*------------------------------------------------------------------*/

  initGeometry() {
    let start = 50;
    let size = 400;
    this.positions = [
      start, start,
      start + size, start,
      start + size, start + size,
      start + size, start + size,
      start, start + size,
      start, start,
    ];
    // this.colors = [
    //   0.0, 0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0, 1.0,
    //   0.0, 0.0, 0.0, 1.0,
    // ]
  }

  initAttributes() {
    this.matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    // this.colorAttributeLocation = this.gl.getAttribLocation(this.program, 'a_color');
  }

  initBuffers() {
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.positions),
      this.gl.STATIC_DRAW,
    );

    // this.colorBuffer = this.gl.createBuffer();
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    // this.gl.bufferData(
    //   this.gl.ARRAY_BUFFER,
    //   new Float32Array(this.colors),
    //   this.gl.STATIC_DRAW,
    // );
  }

  /*------------------------------------------------------------------*\
   |*							               RENDERING
   \*------------------------------------------------------------------*/

  drawScene() {
    this.setScene();
    this.buffersBinding();
    this.computeMatrices();

    let primitiveType = this.gl.TRIANGLES;
    let count = this.positions.length / 2;
    let offset = 0;
    this.gl.drawArrays(primitiveType, offset, count);
  }

  setScene() {
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.program);
  }

  buffersBinding() {
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
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    //
    // size = 4;
    // type = this.gl.FLOAT;
    // normalize = false;
    // stride = 0;
    // offset = 0;
    //
    // this.gl.vertexAttribPointer(
    //   this.colorAttributeLocation,
    //   size, type, normalize, stride, offset,
    // );
  }

  computeMatrices() {
    let transpose = false;
    let matrix = mat3.create();
    mat3.projection(matrix, this.width, this.height);
    mat3.translate(matrix, matrix, [this.values.traX, this.values.traY]);
    mat3.scale(matrix, matrix, [this.values.scaX, this.values.scaY]);
    mat3.rotate(matrix, matrix, toRadian(this.values.rot));
    this.gl.uniformMatrix3fv(this.matrixLocation, transpose, matrix);
  }

  renderLoop = () => {
    if (this.isPlaying) {
      this.updateDt(0.1);
      this.values.rotation = this.dt;
      this.drawScene();
    }
    window.requestAnimationFrame(this.renderLoop);
  };

  /*------------------------------------------------------------------*\
   |*							                VALUES
   \*------------------------------------------------------------------*/

  initValues() {
    this.values = {
      fov: 60,
      zNear: 1,
      zFar: 20000,
      traX: 0,
      traY: 0,
      scaX: 1,
      scaY: 1,
      rot: 0
    };

    this.aspecRatio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
  }
}
