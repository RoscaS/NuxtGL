<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>Hello WebGL</h1>
      <canvas width="300" height="300" id="webgl"></canvas>
    </v-flex>
  </v-layout>
</template>

<script>
import vertex from './vertex';
import fragment from './fragment';

export default {
  components: {},
  name: "first",
  mounted() {
    /* Step1: Prepare the canvas and get WebGL context */
    let canvas = document.getElementById('webgl');
    let gl = canvas.getContext('experimental-webgl');
    
    /* Step2: Define the geometry and store it in buffer objects */
    let vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5];
    let vertex_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    /* Step3: Create and compile Shader programs */
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
    
    /* Step 4: Associate the shader programs to buffer objects */
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    let coord = gl.getAttribLocation(shaderProgram, 'coordinates');
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    
    /* Step5: Drawing the required object (triangle) */
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  },
};
</script>


<style lang="scss" scoped>

</style>
