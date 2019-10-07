import BaseProject from './@BaseProject';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {
    this.geometry.vertices.push(-1.0, -1.0, -2.0);
    this.geometry.vertices.push(1.0, -1.0, -2.0);
    this.geometry.vertices.push(0.0, 1.0, -2.0);

    this.geometry.colors.push(0.0, 0.0, 1.0, 0.2);
    this.geometry.colors.push(0.0, 0.0, 1.0, 0.6);
    this.geometry.colors.push(0.0, 0.0, 1.0, 0.4);

    this.geometry.indices.push(0, 1, 2);
  }

  update() {
    // Nothing
  }
}
