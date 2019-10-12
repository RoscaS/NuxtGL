<template>
  <div>
    <content-card :title="this.projectName" :width="width">
    
      <canvas :class="{'border': border}"
              :width="width"
              :height="height"
              :id="canvasId"></canvas>
          
    </content-card>
    
    <content-card v-if="tools" class="pa-5 mt-5" :width="width">
      <slot name="tools"></slot>
    </content-card>
  </div>

</template>

<script>
  import ContentCard from './ContentCard';

  export default {
    name: 'WebGL',
    components: { ContentCard },
    props: {
      width: { type: String, default: '300' },
      height: { type: String, default: '300' },
      canvasId: { type: String, default: 'webgl' },
      border: { type: Boolean },
      tools: { type: Boolean },
    },
    computed: {
      projectName() {
        let splitted = this.$route.path.split('/');
        return splitted[splitted.length - 1].slice(3).
          split('-').
          map(word => word[0].toUpperCase() + word.slice(1)).
          join(' ');
      },
    },
  };
</script>

<style lang="scss" scoped>
  
  .border {
    /*border: 1px solid lightgray;*/
  }
  

</style>
