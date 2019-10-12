export default `
#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

varying vec4 vColor; // Comming from vertex

void main(void) {
  vec4 vColor2;
  if (gl_FragCoord.x > 100) {
    vColor2.y = 1.0;
    vColor2 + vec4(1.0, 0.0, 0.0, 1.0);
  } else {
    vColor2.y = 0.5;
    vColor2 + vec4(0.0, 1.0, 0.0, 1.0);
  }
  gl_FragColor = vColor + vColor2;
}
`;
