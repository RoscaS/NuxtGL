import BaseProject from './@BaseProject';
import { mat4 } from 'gl-matrix';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {
    let idx = 0;
    for (var xx = -0.9; xx < 0.9; xx += 0.02) {
        if (idx % 2) this.geometry.vertices.push(xx, 0.0, 0.0);
        else this.geometry.vertices.push(xx, 0.1, 0.0);

        if (idx % 3) this.geometry.colors.push(1.0, 0.0, 0.0, 1.0);
        else this.geometry.colors.push(0.0, 0.0, 1.0, 1.0);

        this.geometry.indices.push(idx);
        idx++;
    }
  }

  setCamera() {
    this.camera.pMatrix = mat4.create();  // Projection matrix
    this.camera.mvMatrix = mat4.create(); // Model-view matrix
    this.camera.mvMatrix = mat4.create(); // Model-view matrix
    mat4.identity(this.camera.pMatrix);
    mat4.identity(this.camera.mvMatrix);
    mat4.identity(this.camera.mvMatrix, this.translationMatrix);
  }

  draw(type, shift) {
    mat4.identity(this.translationMatrix);
    mat4.identity(this.camera.mvMatrix);
    mat4.translate(this.camera.mvMatrix, this.translationMatrix, shift);
    this.webGl.gl.uniformMatrix4fv(this.uMatrices.uMVMatrix, false, this.camera.mvMatrix);
    this.webGl.gl.drawElements(type, this.geometry.indices.length, this.webGl.gl.UNSIGNED_SHORT, 0);
  }

  render() {
    let gl = this.webGl.gl;
    let indexSize = this.geometry.indices.length;

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, this.width, this.height);

    gl.uniformMatrix4fv(this.uMatrices.uPMatrix, false, this.camera.pMatrix);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.webGl.buffers.index);
    gl.drawElements(gl.LINE_STRIP, indexSize, gl.UNSIGNED_SHORT, 0);

    this.translationMatrix = mat4.create();

    this.draw(gl.POINTS, [0.0, 0.5, 0.0]);
    this.draw(gl.LINES, [0.0, 0.0, 0.0]);
    this.draw(gl.LINE_STRIP, [0.0, -0.5, 0.0]);
  }
}
