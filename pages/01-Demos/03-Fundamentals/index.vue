<template>
  <WebGL :width="width" :height="height" :canvas-id="canvasId"/>
</template>

<script>
  import script from "./@script";
  import WebGL from '../../../components/WebGL';

  export default {
    components: { WebGL },
    data: () => ({
      width: "400",
      height: "300",
      canvasId: "webgl",
    }),
    mounted() {
      script(this.canvasId, this.width, this.height);
    },
  };
</script>


<style lang="scss" scoped>

</style>
