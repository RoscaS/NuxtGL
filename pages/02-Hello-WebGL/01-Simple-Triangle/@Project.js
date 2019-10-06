import BaseProject from './@BaseProject';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {
    this.geometry.vertices.push(-1.0, -1.0, -2.0); // Bottom left vertex
    this.geometry.vertices.push(1.0, -1.0, -2.0); // Bottom right vertex
    this.geometry.vertices.push(0.0, 1.0, -2.0); // Top vertex

    this.geometry.colors.push(1.0, 0.0, 0.0, 1.0); // Bottom left corner
    this.geometry.colors.push(0.0, 1.0, 0.0, 1.0); // Bottom right corner
    this.geometry.colors.push(0.0, 0.0, 1.0, 1.0); // Top corner

    this.geometry.indexes.push(0, 1, 2);
  }

  update() {
    // Nothing
  }
}
