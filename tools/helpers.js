
export let radToDeg = r => r * 180 / Math.PI;
export let degToRad = d => d * Math.PI / 180;


function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export function createShaderProgram(gl, vertex, fragment) {
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  return createProgram(gl, vertexShader, fragmentShader);
}

