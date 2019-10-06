
export default class ProjectInterface {

  /**
   * **Second step of the pipeline**. Initialization of the `vertices`, their
   * `indices` and their `colors` in 3 differents Arrays wrapped in a geometry
   * object. **The first step** is the declaration of those arrays.
   */
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
