export default `

#ifdef GL_ES // Retro compatibility
  precision highp float; // high precision is set
#endif

// Passed in from the vertex shader
varying vec3 v_normal; 
varying vec3 v_surfaceToLight; 

uniform vec4 u_color;

void main() {
  // Because v_normal is a varying it's interpolated.
  // It means it won't be a unit vector so we do need
  // normalize it.
  vec3 normal = normalize(v_normal);
  
  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  float light = dot(v_normal, surfaceToLightDirection);
  
  gl_FragColor = u_color;
  
  // Multiplying the colors (not the alpha) components by light
  gl_FragColor.rbg *= light;
}
`;
