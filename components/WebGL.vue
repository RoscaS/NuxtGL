<template>
  <div>
    <content-card :title="this.projectName" :width="width">
    
      <canvas :class="{'border': border}"
              :width="width"
              :height="height"
              :id="canvasId"></canvas>
          
    </content-card>
    
      <v-layout>
        <v-spacer/>
        <v-flex v-if="LTools">
          <content-card v-if="true" class="pa-5 mt-5" :width="width">
            <slot name="left-tools"></slot>
          </content-card>
        </v-flex>
        
        <v-flex xs2 ml-4 v-if="RTools">
          <content-card v-if="true" class="pa-5 mt-5">
        
            <slot name="right-tools"></slot>
          </content-card>
        </v-flex>
        <v-spacer/>
      </v-layout>
      
      
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
      LTools: { type: Boolean },
      RTools: { type: Boolean },
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
