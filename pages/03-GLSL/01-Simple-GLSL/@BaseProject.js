import { mat4 } from 'gl-matrix';
import WebGL from '../../../tools/WebGL';
import vertex_script from './@shader-vertex';
import fragment_script from './@shader-fragment';
import ProjectInterface from '../../../tools/ProjectInterface';


export default class BaseProject extends ProjectInterface {
  constructor(canvasId, width, height) {
    super();
    this.webGl = new WebGL(canvasId, vertex_script, fragment_script);
    this.dt = 0.0;

    this.canvasId = canvasId;
    this.width = width;
    this.height = height;

    this.geometry = { vertices: [], indexes: [], colors: [] };
    this.camera = { pMatrix: null, mvMatrix: null };
    this.uMatrices = null;

    this.setGeometry();
    this.setCamera();
    this.initialize();

    let renderLoop = () => {
      this.dt += 0.01;
      this.update();
      this.uMatrices = this.updateBuffers();
      this.render();
      window.requestAnimationFrame(renderLoop);
    };
    renderLoop();
  }

  setGeometry() { /* abstract */ }
  update() { /* abstract */ }

  setCamera() {
    this.camera.pMatrix = mat4.create();  // Projection matrix
    this.camera.mvMatrix = mat4.create(); // Model-view matrix
    mat4.identity(this.camera.pMatrix);
    mat4.identity(this.camera.mvMatrix);
    let rad = 60*(Math.PI / 180);
    let ratio = this.width / this.height;
    mat4.perspective(this.camera.pMatrix, rad, ratio , 0.1, 40);
  }

  bindBuffersToShaders(){
    this.webGl.bindBuffer(this.webGl.buffers.vertex, "aVertexPosition", 3);
    this.webGl.bindBuffer(this.webGl.buffers.fragment, "aColor",4);
    return {
      uPMatrix: this.webGl.gl.getUniformLocation(this.webGl.shaderProgram, 'uPMatrix'),
      uMVMatrix: this.webGl.gl.getUniformLocation(this.webGl.shaderProgram, 'uMVMatrix')
    }
  }

  initialize() {
    this.webGl.initializeShaders();
    return this.updateBuffers();
  }

  updateBuffers() {
    this.webGl.initializeBuffers(this.geometry);
    return this.bindBuffersToShaders();
  }

  render() {
    let gl = this.webGl.gl;
    let indexSize = this.geometry.indexes.length;

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.uMatrices.uPMatrix, false, this.camera.pMatrix);
    gl.uniformMatrix4fv(this.uMatrices.uMVMatrix, false, this.camera.mvMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webGl.buffers.index);
    gl.drawElements(gl.TRIANGLES, indexSize, gl.UNSIGNED_SHORT, 0);
  }
}
