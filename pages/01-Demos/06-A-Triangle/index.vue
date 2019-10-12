<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" tools>
    
      <template v-slot:tools>
        <v-slider thumb-label hide-details v-model="tx" :max="width" label="x"/>
        <v-slider thumb-label hide-details v-model="ty" :max="width" label="y"/>
        <v-slider thumb-label hide-details v-model="sx" min="-1" :max="1" step="0.1" label="scaleX"/>
        <v-slider thumb-label hide-details v-model="sy" min="-1" :max="1" step="0.1" label="scaleY"/>
        <v-slider thumb-label hide-details v-model="angle" :max="360" label="angle"/>
      </template>
      
    </WebGL>
  </div>
</template>

<script>
  import Project from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';

  export default {
    components: { Infos, WebGL },
    data: () => ({
      width: '500',
      height: '500',
      canvasId: 'webgl',
      project: null,
      angle: 0,
      tx: 0,
      ty: 0,
      sx: 0,
      sy: 0,
    }),

    watch: {
      tx(value) {
        this.project.translation.x = value;
        this.project.drawScene();
      },
      ty(value) {
        this.project.translation.y = value;
        this.project.drawScene();
      },
      sx(value) {
        this.project.scale.x = value;
        this.project.drawScene();
      },
      sy(value) {
        this.project.scale.y = value;
        this.project.drawScene();
      },
      angle(value) {
        let angleInDegree = 360 - this.angle;
        this.project.angleInRadians = angleInDegree * Math.PI / 180;
        this.project.drawScene();
      },
    },
    mounted() {
      this.project = new Project(this.canvasId);
      this.tx = this.project.translation.x;
      this.ty = this.project.translation.y;
      this.sx = this.project.scale.x;
      this.sy = this.project.scale.y;
      this.angle = this.project.angleInRadians;
    },
  };
</script>


<style lang="scss" scoped>

</style>
