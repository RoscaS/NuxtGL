export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif


void main(void) { 
  gl_FragColor = vec4(1, 0, 0.5, 1);
}
`;
