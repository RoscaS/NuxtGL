export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

varying vec3 v_position;
varying vec3 v_color;


void main(void) {
    float x = 0.5 * (v_position.x - 10.0);
    float y = 0.5 * (v_position.y - 10.0);
    
    if ((mod(0.25 * x, 10.0) < 5.0) ^^ (mod(0.25 * y, 10.0) < 5.0)) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}
`;
