<template>
  <content-card :title="this.projectName">
  
    <v-layout class="pa-5">
      <v-flex class="pa-5">
        
        <canvas :width="width" :height="height" :id="canvasId"></canvas>
        
      </v-flex>
    </v-layout>
  
  </content-card>
</template>

<script>
  import ContentCard from './ContentCard';
  
  export default {
    name: 'WebGL',
    components: { ContentCard },
    props: {
      width: { type: String, default: "300" },
      height: { type: String, default: "300" },
      canvasId: { type: String, default: "webgl" },
    },
    computed: {
      projectName() {
        let splitted = this.$route.path.split("/");
        return splitted[splitted.length-1]
          .slice(3)
          .split("-")
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
