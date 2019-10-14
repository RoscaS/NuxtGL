<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" LTools
           v-shortkey="keys" @shortkey.native="arrowsKeys">
      <template v-slot:left-tools>
        <Inputs :sliders="sliders" :project="project"/>
      </template>
    </WebGL>
  </div>
</template>

<script>
  import Project from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';
  import Inputs from '../../../components/Inputs';

  const width = '1000';
  const height = '500';

  export default {
    components: { Inputs, Infos, WebGL },
    data: () => ({
      keys: {
        up: ['arrowup'],
        down: ['arrowdown'],
        left: ['arrowleft'],
        right: ['arrowright'],
      },
      increment: 5,
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
        x: { model: 0, min: -2000, max: 2000, step: 0.1, label: 'x', side: "R"},
        y: { model: 0, min: -2000, max: 2000, step: 0.1, label: 'y', side: "R"},
        z: { model: 300, min: -2000, max: 2000, step: 0.1, label: 'z', side: "R"},
      },
    }),
    methods: {
      arrowsKeys(event) {
        console.log("ici")
        switch (event.srcKey) {
          case 'up':
            this.sliders.y.model += this.increment;
            break;
          case 'down':
            this.sliders.y.model -= this.increment;
            break;
          case 'left':
            this.sliders.x.model -= this.increment;
            break;
          case 'right':
            this.sliders.x.model += this.increment;
            break;
        }
      },
    },
    mounted() {
      this.$store.commit("player/SET_ENABLE", true);
      this.project = new Project(this.canvasId, this.$store);
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
