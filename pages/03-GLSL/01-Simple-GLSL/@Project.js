import BaseProject from './@BaseProject';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {

    let index = 0;

    for (let xx = -0.9; xx < 0.9; xx += 0.2) {
      if (index % 2) this.geometry.vertices.push(xx, 0.0, -2.0);
      else this.geometry.vertices.push(xx, 0.1, -2.0);

      if (index % 3) this.geometry.colors.push(1.0, 0.0, 0.0, 1.0);
      else this.geometry.colors.push(0.0, 0.0, 1.0, 1.0);

      this.geometry.indices.push(index++);
    }
  }

  update() {
    // Nothing
  }
}
