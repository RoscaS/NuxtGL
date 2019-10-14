export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

uniform vec4 u_color;


void main() {
  gl_FragColor = u_color;
}
`;
