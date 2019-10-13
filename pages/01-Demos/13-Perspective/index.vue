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

  const width = '500';
  const height = '350';

  export default {
    components: { Sliders, Infos, WebGL },
    data: () => ({
      width: width,
      height: height,
      canvasId: 'webgl',
      project: null,
      sliders: {
        tX: { model: 0, min: 0, max: width, step: 1, label: 'x', side: "L"},
        tY: { model: 0, min: 0, max: height, step: 1, label: 'y', side: "L"},
        tZ: { model: 0, min: -200, max: height, step: 1, label: 'z', side: "L"},
        sX: { model: 0, min: -3, max: 3, step: 0.01, label: 'sX', side: "R"},
        sY: { model: 0, min: -3, max: 3, step: 0.01, label: 'sY', side: "R"},
        sZ: { model: 0, min: -3, max: 3, step: 0.01, label: 'sZ', side: "R"},
        rX: { model: 0, min: 0, max: 360, step: 0.1, label: 'rX', side: "L"},
        rY: { model: 0, min: 0, max: 360, step: 0.1, label: 'rY', side: "L"},
        rZ: { model: 0, min: 0, max: 360, step: 0.1, label: 'rZ', side: "L"},
        fudge: { model: 0, min: 0, max: 2, step: 0.01, label: 'Fudge factor', side: "R" },
      },
    }),
    mounted() {
      this.project = new Project(this.canvasId);
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
