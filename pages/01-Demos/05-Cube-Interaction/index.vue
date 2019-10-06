<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId"/>
  </div>
</template>

<script>
  import script from "./@script";
  import WebGL from '../../../components/WebGL';

  export default {
    components: { WebGL },
    data: () => ({
      width: "300",
      height: "300",
      canvasId: "webgl",
    }),
    mounted() {
      script(this.canvasId);
    },
  };
</script>


<style lang="scss" scoped>

</style>
