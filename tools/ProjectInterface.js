
export default class ProjectInterface {

  setGeometry() { /* abstract */ }

  update() { /* abstract */ }

  setCamera() { /* abstract */ }

  /**
   * Binds buffers to their respective attributes inside GLSL code and
   * sets the member attribute `uMatrices` .
   */
  bindBuffersToShaders() { /* abstract */ }

  initialize() { /* abstract */ }

  updateBuffers() { /* abstract */ }

  render() { /* abstract */ }
}
