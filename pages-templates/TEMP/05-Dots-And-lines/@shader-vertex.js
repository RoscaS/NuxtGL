export default `
uniform mat4 uMVMatrix; // Same for all pixels
uniform mat4 uPMatrix;  // Same for all pixels

attribute vec3 aVertexPosition; // Vertex position (x,y,z)
attribute vec4 aColor; // Vertex color (r, g, b, a)

varying vec4 vColor; // Going to fragment

void main(void) {
  vColor = aColor;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`;
