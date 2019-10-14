export default `
attribute vec4 a_position;
attribute vec3 a_normal;

uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

varying vec3 v_normal;

varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main() {
    // Multiply the position by the matrix.
    gl_Position = u_worldViewProjection * a_position;

    // Orient the normals and pass to the fragment shader
    v_normal = mat3(u_worldInverseTranspose) * a_normal;
    
    // Compute the world position of the surface
    vec3 surfaceWorldPosition = (u_world * a_position).xyz;
    
    // Compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    
    // Compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
}
`;
