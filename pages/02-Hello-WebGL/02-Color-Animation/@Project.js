import BaseProject from './@BaseProject';

let sin = (dt, abs = false) => abs ? Math.abs(Math.sin(dt)) : Math.sin(dt);
let cos = (dt, abs = false) => abs ? Math.abs(Math.cos(dt)) : Math.cos(dt);

let ca = dt => [sin(dt, true), sin(dt, true), cos(dt, true), 1.0];
let cb = dt => [sin(dt, true), cos(dt, true), sin(dt, true), 1.0];
let cc = dt => [cos(dt, true), sin(dt, true), sin(dt, true), 1.0];

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
    this.geometry.colors = [];
    this.geometry.colors.push(...ca(this.dt));
    this.geometry.colors.push(...cb(this.dt));
    this.geometry.colors.push(...cc(this.dt));
  }
}
