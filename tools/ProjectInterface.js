
export default class ProjectInterface {

  setGeometry() { /* abstract */ }

  update() { /* abstract */ }

  setCamera() { /* abstract */ }

  /**
   * **Second step of the pipeline**
   */
  bindBuffersToShaders() { /* abstract */ }

  initialize() { /* abstract */ }

  updateBuffers() { /* abstract */ }

  render() { /* abstract */ }
}
