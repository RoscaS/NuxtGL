export default `
#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

varying vec4 vColor; // Comming from vertex

void main(void) {
  gl_FragColor = vColor;
}
`;
