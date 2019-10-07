import BaseProject from './@BaseProject';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {
    this.geometry.vertices.push(-0.6, 0.0, -2.0);  // left
    this.geometry.vertices.push( 0.0,  1.0, -2.0); // top
    this.geometry.vertices.push( 0.0, -1.0, -2.0); // bottom
    this.geometry.vertices.push( 0.6,  0.0, -2.0); // right

    this.geometry.colors.push(0.0, 0.0, 1.0, 0.8);
    this.geometry.colors.push(0.0, 1.0, 0.0, 0.8);
    this.geometry.colors.push(1.0, 0.0, 0.0, 0.8);
    this.geometry.colors.push(1.0, 1.0, 0.0, 0.8);

    this.geometry.indices.push(0, 1, 2, 1, 2, 3);
  }

  update() {
    // Nothing
  }
}
