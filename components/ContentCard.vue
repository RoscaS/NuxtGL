<template>
  <v-card
    class="mx-auto"
    :width="width"
    tile
  >
    <v-list>
      <v-subheader class="title font-weight-light">
        <v-divider class="line mr-4" color="ec008c"/>
        <span class="title font-weight-light header-text">
          {{ title }}
        </span>
        <v-divider class="line ml-4" color="ec008c"/>
      </v-subheader>
    </v-list>
    
    <slot></slot>

  </v-card>
</template>

<script>
  export default {
    name: 'ContentCard',
    props: {
      width: { type: String },
      title: { type: String },
    },
  };
</script>

<style lang="scss" scoped>
  .header-title {
    display: flex;
    align-content: baseline;
    padding-top: 15px;
  }
  
  .line {
    color: #ec008c !important;
    margin-top: 10px !important;
  }
</style>
