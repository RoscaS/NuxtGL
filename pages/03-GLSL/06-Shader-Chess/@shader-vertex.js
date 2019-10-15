export default `

attribute vec2 a_position;
//attribute vec4 a_color;

uniform mat3 u_matrix;

varying vec3 v_position;
varying vec3 v_color;

void main(void) {
//  v_color = a_color;
  v_color = vec3((a_position.x +1.0)/2.0, (a_position.y+1.0)/2.0, 0.67868);
  v_position = vec3(a_position, 1);
  gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
  
}
`;
