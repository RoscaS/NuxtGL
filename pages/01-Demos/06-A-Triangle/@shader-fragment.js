export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`;
