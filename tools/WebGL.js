export default class WebGl {

  constructor(canvas, vertexScript, fragmentScript) {
    this.vertexScript = vertexScript;
    this.fragmentScript = fragmentScript;
    this.canvas = document.getElementById(canvas);
    this.gl = this.canvas.getContext(canvas);

    this.shaderProgram = null;
    this.buffers = null;
  }

   /*------------------------------------------------------------------*\
   |*							               BUFFERS      				            		 *|
   \*------------------------------------------------------------------*/

  /**
   * **First step in the pipline** after the declaration of the geometry
   * inside the main JS code. Set `buffers` member attribute with an
   * object that contains 3 buffers that are bound to their respective Shaders
   * inside the GLSL code.
   * @param {Object} geometry contains 3 JS arrays:
   * `Vertices`, `Colors`, `Indexes`
   */
  initializeBuffers(geometry) {
    let vertices = new Float32Array(geometry.vertices);
    let colors = new Float32Array(geometry.colors);
    let indexes = new Uint16Array(geometry.indexes);

    let elementArrayBuffer = this.gl.ELEMENT_ARRAY_BUFFER;
    let arrayBuffer = this.gl.ARRAY_BUFFER;

    this.buffers = {
      vertex: this.createBuffer(arrayBuffer, vertices, this.gl),
      fragment: this.createBuffer(arrayBuffer, colors, this.gl),
      index: this.createBuffer(elementArrayBuffer, indexes, this.gl),
    };
  }

  /**
   * Create a buffer that can be used to pass data from the JS code to the
   * GLSL (shader) code (From the CPU to the GPU).
   * @param{Number} bufferType WebGL const specifing the type of buffer array
   * @param data {Array} JS array containing list of vectors
   * @returns {WebGLBuffer} Buffer ready to be bind
   */
  createBuffer(bufferType, data) {
    // Create a buffer
    let buffer = this.gl.createBuffer();
    // Bind an empty array buffer to it
    this.gl.bindBuffer(bufferType, buffer);
    // Pass the vertices data to the buffer
    this.gl.bufferData(bufferType, data, this.gl.STATIC_DRAW);
    // Unbind the buffer
    this.gl.bindBuffer(bufferType, null);
    return buffer;
  }

  /**
   * Bind `buffer` to it's related attribute inside the GLSL code.
   * @param {WebGLBuffer} buffer buffer to be bound
   * @param {String} attrName string that contains the name of the
   * corresponding GLSL attribute (`aVertexPosition`, `aColor`, ...)
   * @param {Number} vectorSize vector size (`vec2`,`3`,`4`) inside the GLSL code
   */
  bindBuffer(buffer, attrName, vectorSize) {
    let attribute = this.gl.getAttribLocation(this.shaderProgram, attrName);
    let args = [attribute, vectorSize, this.gl.FLOAT, false, 0, 0];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.vertexAttribPointer(...args);
    this.gl.enableVertexAttribArray(attribute);
  }

   /*------------------------------------------------------------------*\
   |*							               SHADERS      				            		 *|
   \*------------------------------------------------------------------*/

  /**
   * Handle the initialization of the GLSL code for both shaders.
   */
  initializeShaders() {
    let args = [this.vertexScript, this.gl.VERTEX_SHADER];
    let vertexShader = this.createShader(...args);

    args = [this.fragmentScript, this.gl.FRAGMENT_SHADER];
    let fragmentShader = this.createShader(...args);

    // Create a shader program object to store combined shader program
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);
    this.gl.useProgram(this.shaderProgram);
  }

  /**
   * Create and compile a Shader.
   * @param {String} shaderScript Contains the GLSL code
   * @param {Number} WebGL constant that designate the type of shader
   * (Vertex or Fragment) to be created.
   * @returns {WebGLShader} Compiled shader.
   */
  createShader(shaderScript, type) {
    let shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, shaderScript);
    this.gl.compileShader(shader);
    return shader;
  }

}
