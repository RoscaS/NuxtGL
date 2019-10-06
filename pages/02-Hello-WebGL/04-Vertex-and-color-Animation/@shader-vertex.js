export default `
attribute vec3 aVertexPosition; // Vertex position (x,y,z)
attribute vec4 aColor; // Vertex color

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;

void main(void) {
  vColor = aColor;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`;
