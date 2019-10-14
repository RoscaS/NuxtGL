export default `

attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose; // better u_world

varying vec3 v_normal;

void main() {
    // Multiply the position by the matrix.
    gl_Position = u_worldViewProjection * a_position;

    // Pass normal to fragment shader
    v_normal = mat3(u_worldInverseTranspose) * a_normal;

    // Equivalent to:
//    v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
}
`;
