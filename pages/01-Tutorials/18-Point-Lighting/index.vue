<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" LTools
           v-shortkey="keys" @shortkey.native="arrowsKeys">
      <template v-slot:left-tools>
        <Inputs :sliders="sliders" :project="project" color-picker/>
      </template>
    </WebGL>
  </div>
</template>

<script>
  import Project from './@script';
  import WebGL from '../../../components/WebGL';
  import Infos from '../../../components/Infos';
  import Inputs from '../../../components/Inputs';

  const width = '500';
  const height = '400';

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
        tarX: { model: 0, min: -400, max: 400, step: 0.01, label: 'tarX', side: "L"},
        tarY: { model: 0, min: -400, max: 400, step: 0.01, label: 'tarY', side: "L"},
        ligX: { model: 0, min: -400, max: 500, step: 0.01, label: 'ligX', side: "L"},
        ligY: { model: 0, min: -400, max: 500, step: 0.01, label: 'ligY', side: "L"},
        ligZ: { model: 0, min: -400, max: 500, step: 0.01, label: 'ligZ', side: "L"},
        fov: { model: 60, min: 0, max: 180, step: 0.01, label: 'Field of view', side: "L"},
        rotation: { model: 60, min: -360, max: 360, step: 0.01, label: 'rotation', side: "L"},
        camX: { model: 0, min: -1000, max: 1000, step: 0.01, label: 'camX', side: "R"},
        camY: { model: 0, min: -1000, max: 1000, step: 0.01, label: 'camY', side: "R"},
        camZ: { model: 0, min: -1000, max: 1000, step: 0.01, label: 'camZ', side: "R"},
      },
    }),
    methods: {
      arrowsKeys(event) {
        switch (event.srcKey) {
          case 'up':
            this.sliders.camZ.model += this.increment;
            break;
          case 'down':
            this.sliders.camZ.model -= this.increment;
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
      this.$store.commit("player/SET_SPEED", 5);
      this.project = new Project(this.canvasId, this.$store);
      
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
