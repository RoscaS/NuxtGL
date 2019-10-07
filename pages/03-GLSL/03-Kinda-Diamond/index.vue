<template>
  <WebGL :width="width" :height="height" :canvas-id="canvasId"/>
</template>

<script>
  import Project from "./@Project";
  import WebGL from '../../../components/WebGL';

  export default {
    components: { WebGL },
    data: () => ({
      width: "500",
      height: "500",
      canvasId: "webgl",
    }),
    mounted() {
      new Project(this.canvasId, this.width, this.height);
    },
  };
</script>


<style lang="scss" scoped>

</style>
