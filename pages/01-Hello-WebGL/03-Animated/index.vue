<template>
  
  <WebGL title="Hello WebGL">
    <canvas width="300" height="300" id="webgl"></canvas>
  </WebGL>
  
</template>

<script>
import ContentCard from '../../../components/ContentCard';
import WebGL from '../../../components/WebGL';
import vertex from './vertex';
import fragment from './fragment';
import {mat4} from 'gl-matrix'

export default {
  components: { WebGL, ContentCard },
  name: 'first',
  mounted() {
    
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('experimental-webgl');
    
    let vertexBuffer = null;
    let colorBuffer = null;
    let indexBuffer = null;
    
    let vertices = [];
    let colors = [];
    let indices = [];
    
    let mvMatrix = mat4.create(); // Model-view matrix
    let pMatrix = mat4.create();  // Projection matrix
    
    initWebGL();
    
    function initShaderParameters(prg) {
      prg.vertexPositionAttribute = gl.getAttribLocation(prg,
        'aVertexPosition',
      );
      gl.enableVertexAttribArray(prg.vertexPositionAttribute);
    
      prg.colorAttribute = gl.getAttribLocation(prg, 'aColor');
      gl.enableVertexAttribArray(prg.colorAttribute);
    
      prg.pMatrixUniform = gl.getUniformLocation(prg, 'uPMatrix');
    
      prg.mvMatrixUniform = gl.getUniformLocation(prg, 'uMVMatrix');
    }
    
    function initBuffers() {
      vertices.push(-1.0, -1.0, -2.0); // Bottom left vertex
      vertices.push(1.0, -1.0, -2.0); // Bottom right vertex
      vertices.push(0.0, 1.0, -2.0); // Top vertex
    
      colors.push(1.0, 0.0, 0.0, 1.0); // Bottom left corner
      colors.push(0.0, 1.0, 0.0, 1.0); // Bottom right corner
      colors.push(0.0, 0.0, 1.0, 1.0); // Top corner
    
      indices.push(0, 1, 2);
    
      vertexBuffer = getVertexBufferWithVertices(vertices);
      colorBuffer = getVertexBufferWithVertices(colors);
      indexBuffer = getIndexBufferWithIndices(indices);
    }
    
    function drawScene() {
      gl.clearColor(0.9, 0.9, 0.9, 1.0);
      gl.clearColor(1, 1, 1, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.viewport(0, 0, c_width, c_height);
    
      mat4.identity(pMatrix);
      mat4.identity(mvMatrix);
      mat4.perspective(pMatrix, degToRad(60), c_width / c_height, 0.1, 40);
    
      // mat4.perspective(60, c_width / c_height, 0.1, 10000.0, pMatrix)
    
      gl.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
      gl.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
    
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(prg.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0,);
    
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(prg.colorAttribute, 4, gl.FLOAT, false, 0, 0,);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
      gl.drawElements(gl.TRIANGLE_STRIP, indices.length, gl.UNSIGNED_SHORT, 0,);
    }
    
    function initWebGL() {
      let vertCode = vertex;
      let vertShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShader, vertCode);
      gl.compileShader(vertShader);
  
      let fragCode = fragment;
      let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShader, fragCode);
      gl.compileShader(fragShader);
  
      let shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);
      
      
      initShaderParameters(shaderProgram);
      initBuffers();
      renderLoop();
      
    }
    
    function requestAnimFrame(o) {
      requestAnimFrame(o);
    }
    
    requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element,) {
          window.setTimeout(callback, 1000.0 / 60.0);
        };
    })();
    
    function renderLoop() {
      requestAnimFrame(renderLoop);
      drawScene();
    }
    
    function getVertexBufferWithVertices(vertices) {
      var vBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),
        gl.STATIC_DRAW,
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
      return vBuffer;
    }
    
    function getIndexBufferWithIndices(indices) {
      var iBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices),
        gl.STATIC_DRAW,
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
      return iBuffer;
    }
  },
};
</script>


<style lang="scss" scoped>

</style>
