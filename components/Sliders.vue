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
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  export default {
    name: 'Sliders',
    props: {
      sliders: { type: Object },
      project: { type: Object }
    },
    watch: {
      sliders: {
        handler(value) {
          for (let s in this.sliders) {
            this.project.values[s] = this.sliders[s].model
          }
          this.project.drawScene();

        }, deep: true,
      },
    },
    mounted() {

    },
  };
</script>

<style lang="scss" scoped>

</style>
