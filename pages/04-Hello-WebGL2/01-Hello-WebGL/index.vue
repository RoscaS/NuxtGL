<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" l-tools
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

  const width = '500';
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
        traX: { model: 0, min: -width, max: width, step: 0.01, label: 'traX', side: "L"},
        traY: { model: 0, min: -height, max: height, step: 0.01, label: 'traY', side: "L"},
        rot: { model: 1, min: -360, max: 360, step: 0.01, label: 'rot', side: "L"},
        scaX: { model: 1, min: 0, max: 2, step: 0.01, label: 'scaX', side: "R"},
        scaY: { model: 1, min: 0, max: 2, step: 0.01, label: 'scaY', side: "R"},
      },
    }),
    methods: {
      arrowsKeys(event) {
        switch (event.srcKey) {
          case 'up':
            this.sliders.traY.model -= this.increment;
            break;
          case 'down':
            this.sliders.traY.model += this.increment;
            break;
          case 'left':
            this.sliders.traX.model -= this.increment;
            break;
          case 'right':
            this.sliders.traX.model += this.increment;
            break;
        }
      },
    },
    mounted() {
      // this.$store.commit("player/SET_ENABLE", true);
      // this.$store.commit("player/SET_SPEED", 5);
      this.project = new Project(this.canvasId, this.$store);
      
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
