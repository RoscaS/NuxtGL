<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId"/>
    
<!--    <Infos :width="width">-->
<!--      <p>-->
<!--      </p>-->
<!--    </Infos>-->
  </div>
</template>

<script>
  import script from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';

  export default {
    components: { Infos, WebGL },
    data: () => ({
      width: '500',
      height: '400',
      canvasId: 'webgl',
    }),
    mounted() {
      script(this.canvasId, this.width, this.height);
    },
  };
</script>


<style lang="scss" scoped>

</style>
