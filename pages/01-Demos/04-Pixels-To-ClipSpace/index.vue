<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" border/>
    
    <Infos :width="width">
      <p>
        To make our life easier, we convert from traditional pixel values
        coordinates (0, max_size) to clip space coordinate (-1 -> 1)
        inside the vertex shader.
      </p>
    </Infos>
  </div>
</template>

<script>
  import script from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';

  export default {
    components: { Infos, WebGL },
    data: () => ({
      width: '400',
      height: '300',
      canvasId: 'webgl',
    }),
    mounted() {
      script(this.canvasId, this.width, this.height);
    },
  };
</script>


<style lang="scss" scoped>

</style>
