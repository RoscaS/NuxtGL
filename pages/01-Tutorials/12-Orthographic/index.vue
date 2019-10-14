<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" tools>
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
  import Sliders from '../../../components/Inputs';

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
        tX: { model: 0, min: 0, max: width, step: 1, label: 'x' },
        tY: { model: 0, min: 0, max: height, step: 1, label: 'y' },
        tZ: { model: 0, min: 0, max: height, step: 1, label: 'z' },
        sX: { model: 0, min: -3, max: 3, step: 0.01, label: 'sX' },
        sY: { model: 0, min: -3, max: 3, step: 0.01, label: 'sY' },
        sZ: { model: 0, min: -3, max: 3, step: 0.01, label: 'sZ' },
        rX: { model: 0, min: 0, max: 360, step: 0.1, label: 'rX' },
        rY: { model: 0, min: 0, max: 360, step: 0.1, label: 'rY' },
        rZ: { model: 0, min: 0, max: 360, step: 0.1, label: 'rZ' },
      },
    }),
    computed: {
      name() {
        return this.data;
      },
    },
    mounted() {
      this.project = new Project(this.canvasId);
      for (let s in this.sliders) {
        this.sliders[s].model = this.project.values[s];
      }
    },
  };
</script>
