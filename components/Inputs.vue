<template>
  <div>
    <v-layout justify-space-between>
      <v-flex xs6 mr-3>
        <v-slider v-for="s in sliders"
                  v-if="s.side == 'L'"
                  v-model="s.model"
                  :key="s.label"
                  :min="s.min"
                  :max="s.max"
                  :step="s.step"
                  :label="s.label"
                  thumb-label
                  hide-details
        />
      </v-flex>
      <v-flex xs6 ml-3>
        <v-slider v-for="s in sliders"
                  v-if="s.side == 'R'"
                  v-model="s.model"
                  :key="s.label"
                  :min="s.min"
                  :max="s.max"
                  :step="s.step"
                  :label="s.label"
                  thumb-label
                  hide-details
        />
        <v-color-picker v-if="colorPicker"
                        mode="rgba"
                        v-model="figure"
                        hide-inputs
                        hide-canvas
                        flat/>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  export default {
    name: 'Inputs',
    props: {
      sliders: { type: Object },
      project: { type: Object },
      colorPicker: { type: Boolean },
    },
    data: () => ({
      figure: { r: 0, g: 191, b: 255, a: 1 },
    }),
    watch: {
      sliders: {
        handler(value) {
          for (let s in this.sliders) {
            this.project.values[s] = this.sliders[s].model;
          }
          this.project.drawScene();

        }, deep: true,
      },
      figure(value) {
        let f = channel => channel / 255;
        this.project.figureColor = [f(value.r), f(value.g), f(value.b), value.a,];
        this.project.drawScene();
      },
    },
    mounted() {
      setTimeout(() => {
        try {
          this.figure.r = this.project.figureColor[0] * 255;
          this.figure.g = this.project.figureColor[1] * 255;
          this.figure.b = this.project.figureColor[2] * 255;
          this.figure.a = this.project.figureColor[3] * 255;
        } catch (e) {}
      }, 500);

    },
  };
</script>

<style lang="scss" scoped>

</style>
