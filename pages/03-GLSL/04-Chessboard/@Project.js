import BaseProject from './@BaseProject';

export default class Project extends BaseProject {
  constructor(canvasId, width, height) {
    super(canvasId, width, height);
  }

  setGeometry() {
    let start = -1;
    let size = 0.4;
    let c = 0;
    let count = 5;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        let color = (i + j) % 2 ? 1.0 : 0.0;

        this.geometry.vertices.push(start + size * i, start + size * j, -2.0,);
        this.geometry.colors.push(color, color, color, 1.0);

        this.geometry.vertices.push(start + size + size * i, start + size * j, -2.0);
        this.geometry.colors.push(color, color, color, 1.0);

        this.geometry.vertices.push(start + size * i, start + size + size * j, -2.0);
        this.geometry.colors.push(color, color, color, 1.0);

        this.geometry.vertices.push(start + size + size * i, start + size + size * j, -2.0);
        this.geometry.colors.push(color, color, color, 1.0);

        this.geometry.indices.push(c, c + 1, c + 2, c + 1, c + 2, c + 3);

        c = c + 4;
      }
    }
  }

  update() {
    // Nothing
  }
}
