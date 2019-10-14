export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

varying vec3 v_normal; // commint from vertex shader

uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

void main() {
  // Because v_normal is a varying it's interpolated.
  // It means it won't be a unit vector so we do need
  // normalize it.
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);
  
  gl_FragColor = u_color;
  
  // Multiplying the colors (not the alpha) components by light
  gl_FragColor.rbg *= light;
}
`;
