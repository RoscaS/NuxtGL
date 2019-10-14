<template>
  <div>
    <WebGL :width="width" :height="height" :canvas-id="canvasId" tools>
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

  const width = '800';
  const height = '500';

  export default {
    components: { Inputs, Infos, WebGL },
    data: () => ({
      width: width,
      height: height,
      canvasId: 'webgl',
      project: null,
      sliders: {
        tX: { model: 0, min: 0, max: width, step: 1, label: 'x' },
        tY: { model: 0, min: 0, max: height, step: 1, label: 'y' },
        sX: { model: 0, min: -3, max: 3, step: 0.01, label: 'scaleX' },
        sY: { model: 0, min: -3, max: 3, step: 0.01, label: 'scaleY' },
        an: { model: 0, min: 0, max: 360, step: 0.1, label: 'angle' },
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
