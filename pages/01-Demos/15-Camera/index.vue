<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" LTools>
      <template v-slot:left-tools>
        <Sliders :sliders="sliders" :project="project"/>
      </template>
    </WebGL>
  </div>
</template>

<script>
  import Project from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';
  import Sliders from '../../../components/Sliders';

  const width = '1000';
  const height = '500';

  export default {
    components: { Sliders, Infos, WebGL },
    data: () => ({
      width: width,
      height: height,
      canvasId: 'webgl',
      project: null,
      sliders: {
        cameraAngle: { model: 60, min: -360, max: 360, step: 0.01, label: 'Camera angle', side: "L"},
        fov: { model: 60, min: 0, max: 180, step: 0.01, label: 'Field of view', side: "L"},
        zNear: { model: 1, min: 1, max: 2000, step: 0.1, label: 'zNear', side: "L"},
        zFar: { model: 2000, min: 0, max: 40000, step: 0.1, label: 'zFar', side: "L"},
        figures: { model: 5, min: 1, max: 300, step: 1, label: 'Figures', side: "R"},
        spread: { model: 200, min: 1, max: 2000, step: 0.1, label: 'Spread', side: "R"},
        radius: { model: 300, min: 0, max: 2000, step: 0.1, label: 'Distance from center', side: "R"},
      },
    }),
    mounted() {
      this.$store.commit("player/SET_ENABLE", true);
      this.project = new Project(this.canvasId, this.$store);
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
