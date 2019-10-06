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
   * Set `buffers` member attribute with an object that contains 3 buffers that
   * are bound to their respective Shaders inside the GLSL code.
   * @param {Object} geometry contains 3 JS arrays:
   * `vertices`, `colors`, `indices`
   */
  initializeBuffers(geometry) {
    let vertices = new Float32Array(geometry.vertices);
    let colors = new Float32Array(geometry.colors);
    let indices = new Uint16Array(geometry.indices);

    let elementArrayBuffer = this.gl.ELEMENT_ARRAY_BUFFER;
    let arrayBuffer = this.gl.ARRAY_BUFFER;

    this.buffers = {
      vertex: this.createBuffer(arrayBuffer, vertices, this.gl),
      fragment: this.createBuffer(arrayBuffer, colors, this.gl),
      index: this.createBuffer(elementArrayBuffer, indices, this.gl),
    };
  }

  /**
   * **Third step of the pipeline**: Create a buffer that can be used to pass
   * data from the JS code to the GLSL (shader) code (From the CPU to the GPU).
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
   * **Fourth step of the pipeline**: Bind `buffer` to it's related attribute
   * inside the GLSL code. First we bind the buffer to the GLSL file trough
   * `gl.bindBuffer()` and then we specifie that the data will be delivered
   * trough a pointer with `gl.vertexAttribPointer`.
   * @param {WebGLBuffer} buffer buffer to be bound
   * @param {String} attrName string that contains the name of the
   * corresponding GLSL attribute (`aVertexPosition`, `aColor`, ...)
   * @param {Number} vectorSize vector size (`vec2`,`3`,`4`) inside the GLSL code
   */
  bindBuffer(buffer, attrName, vectorSize) {
    let attr = this.gl.getAttribLocation(this.shaderProgram, attrName);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.vertexAttribPointer(attr, vectorSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(attr);
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
   * Create and compile a shader.
   * @param {String} shaderScript Contains the shader GLSL code
   * @param {Number} type WebGL constant that designate the type of the shader
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
