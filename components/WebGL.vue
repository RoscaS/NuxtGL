<template>
  <content-card :title="title">
  
    <v-layout class="pa-5">
      <v-flex class="pa-5">
        <slot></slot>
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
      width: { type: String },
      title: { type: String },
    },
  };
</script>

<style lang="scss" scoped>

</style>
