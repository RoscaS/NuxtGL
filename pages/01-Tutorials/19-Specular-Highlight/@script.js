import { createShaderProgram, degToRad } from '../../../tools/helpers';
import { setGeometry, setNormals } from './@geometry';
import fragment from './@shader-fragment';
import vertex from './@shader-vertex';
import m4 from './@matrix';

export default class Project {

  constructor(canvasId, store) {
    let canvas = document.getElementById(canvasId);
    // Autocompletion workaround
    let gl = canvas.getContext("webgl");
    this.gl = gl;

    this.width = canvas.width;
    this.height = canvas.height;
    this.program = createShaderProgram(this.gl, vertex, fragment);
    this.store = store;

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
  get isPlaying(){ return this.store.state.player.playing; }
  updateDt(t) { this.store.commit("player/UPDATE_DT", t) }

  get camera() { return [this.values.camX, this.values.camY, this.values.camZ] }
  get target() { return [this.values.tarX, this.values.tarY, this.values.tarZ] }
  get light() { return [this.values.ligX, this.values.ligY, this.values.ligZ]}

  /*------------------------------------------------------------------*\
  |*							            INITIALIZATION
  \*------------------------------------------------------------------*/

  initAttributes() {
    // look up where the vertex data needs to go.
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.normalLocation = this.gl.getAttribLocation(this.program, 'a_normal');

    // look up uniforms
    this.colorLocation = this.gl.getUniformLocation(this.program, 'u_color');
    this.worldLocation = this.gl.getUniformLocation(this.program, "u_world");
    this.shininessLocation = this.gl.getUniformLocation(this.program, 'u_shininess');
    this.WVPLocation = this.gl.getUniformLocation( // World View Projection
      this.program, "u_worldViewProjection"
    );
    this.WITLocation = this.gl.getUniformLocation( // World Inverse Transpose
      this.program, 'u_worldInverseTranspose'
    );
    this.lightWorldPositionLocation = this.gl.getUniformLocation(
      this.program, "u_lightWorldPosition"
    );
    this.viewWorldPositionLocation = this.gl.getUniformLocation(
      this.program, "u_viewWorldPosition"
    );
  }

  initBuffers() {
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    setGeometry(this.gl);

    this.normalBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
    setNormals(this.gl);
  }

  /*------------------------------------------------------------------*\
  |*							               RENDERING
  \*------------------------------------------------------------------*/

  drawScene() {
    this.setScene();
    this.buffersBinding();
    this.computeMatrices();

    let primitiveType = this.gl.TRIANGLES;
    let count = 16 * 6;
    let offset = 0;
    this.gl.drawArrays(primitiveType, offset, count);
  }

  setScene() {
    this.gl.viewport(0, 0, this.width, this.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.program);
  }

  buffersBinding() {
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

    // Turn on the normal attribute
    this.gl.enableVertexAttribArray(this.normalLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);

    size = 3;
    type = this.gl.FLOAT;
    normalize = false;
    stride = 0;
    offset = 0;

    this.gl.vertexAttribPointer(
      this.normalLocation,
      size, type, normalize, stride, offset,
    );
  }

  computeMatrices() {
    // Compute projection matrix
    let projectionMatrix = m4.perspective(
      degToRad(this.values.fov),
      this.aspecRatio,
      this.values.zNear,
      this.values.zFar,
    );
    // Compute camera's matrix
    let cameraMatrix = m4.lookAt(this.camera, this.target, this.up);
    // View matrix from camera's matrix
    let viewMatrix = m4.inverse(cameraMatrix);
    // Compute view projection matrix
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    // Draw a figure at the origin
    let worldMatrix = m4.yRotation(degToRad(this.values.rotation));

    // Multiply matrices => (worldViewProjectionMatrix)
    let worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);
    let worldInverseMarix = m4.inverse(worldMatrix);
    let worldInverseTransposeMatrix = m4.transpose(worldInverseMarix);

    // Set matrix
    let transpose = false;
    this.gl.uniformMatrix4fv(this.WVPLocation, transpose, worldViewProjectionMatrix);
    this.gl.uniformMatrix4fv(this.WITLocation, transpose, worldInverseTransposeMatrix);
    this.gl.uniformMatrix4fv(this.worldLocation, transpose, worldMatrix);
    // Set the color to use
    this.gl.uniform4fv(this.colorLocation, this.figureColor);
    // Set light direction
    this.gl.uniform3fv(this.lightWorldPositionLocation, this.light);
    // Set the camera/view position
    this.gl.uniform3fv(this.viewWorldPositionLocation, this.camera);
    // Set the shininess
    this.gl.uniform1f(this.shininessLocation, this.values.shine)
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
      cameraAngle: 60,
      fov: 60,
      zNear: 1,
      zFar: 20000,
      rotation: 0, //figureRotationRad
      shine: 100,
      camX: 147,
      camY: 0,
      camZ: 176,

      tarX: 0,
      tarY: 35,
      tarZ: 0,

      ligX: 23,
      ligY: 46,
      ligZ: 84,
    };

    this.up = [0, 1, 0];
    this.aspecRatio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    this.figureColor = [0.2, 1, 0.2, 1]; // green
  }
}
