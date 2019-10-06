
export default class WebGl {

  constructor(canvas, vertexScript, fragmentScript) {
    this.vertexScript = vertexScript;
    this.fragmentScript = fragmentScript;
    this.canvas = document.getElementById(canvas);
    this.gl = this.canvas.getContext(canvas);

    this.shaderProgram = null;
    this.buffers = null;
  }

  _createShader(shaderScript, type) {
    let shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, shaderScript);
    this.gl.compileShader(shader);
    return shader;
  }

  initializeShaders() {
    let args = [this.vertexScript, this.gl.VERTEX_SHADER];
    let vertexShader = this._createShader(...args);

    args = [this.fragmentScript, this.gl.FRAGMENT_SHADER];
    let fragmentShader = this._createShader(...args);

    // Create a shader program object to store combined shader program
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);
    this.gl.useProgram(this.shaderProgram);
    return this.shaderProgram;
  }

  bindBuffer(buffer, glslVarName, vectorSize) {
    let attribute = this.gl.getAttribLocation(this.shaderProgram, glslVarName);
    let args = [attribute, vectorSize, this.gl.FLOAT, false, 0, 0];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.vertexAttribPointer(...args);
    this.gl.enableVertexAttribArray(attribute);
  }

  createBuffer(type, array) {
    let buffer = this.gl.createBuffer();
    // Bind an empty array buffer to it
    this.gl.bindBuffer(type, buffer);
    // Pass the vertices data to the buffer
    this.gl.bufferData(type, array, this.gl.STATIC_DRAW);
    // Unbind the buffer
    this.gl.bindBuffer(type, null);
    return buffer
  }

  initializeBuffers(geometry) {
    let verticesArray = new Float32Array(geometry.vertices);
    let colorsArray =  new Float32Array(geometry.colors);
    let indexesArray = new Uint16Array(geometry.indexes);

    let elementArrayBit = this.gl.ELEMENT_ARRAY_BUFFER;
    let arrayBit = this.gl.ARRAY_BUFFER;

    this.buffers = {
      vertex: this.createBuffer(arrayBit, verticesArray, this.gl),
      fragment: this.createBuffer(arrayBit, colorsArray, this.gl),
      index: this.createBuffer(elementArrayBit, indexesArray, this.gl),
    };
    return this.buffers;
  }
}
