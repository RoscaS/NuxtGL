<template>
<div>
    <Sumary/>
    <Infos width="800">
        <blockquote class="home-quotes">
        WebGL is actually a pretty simple API. It just executes 2 user supplied
        functions, a vertex shader and fragment shader and draws triangles,
        lines, or points. While it can get more complicated to do 3D that
        complication is added by the programmer, in the form of more
        complex shaders. The WebGL API itself is just a rasterizer and
        conceptually fairly simple.
        </blockquote>
        <br>
        <blockquote class="quote">
            <b>Rasterize</b> is a fancy word for “draws it with pixels”.
        </blockquote>
    </Infos>
</div>
</template>

<script>
import Sumary from '../components/Sumary';
import Infos from '../components/Infos';

export default {
  components: { Infos, Sumary },
};
</script>

<style lang="scss">
@import "../assets/global";


</style>
