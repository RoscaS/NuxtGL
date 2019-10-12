<template>
  <div :style="`max-width:${parseInt(width) + 60}px`" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Infos',
    props: {
      width: { type: String | Number },
    },
  };
</script>

<style lang="scss" scoped>

  .wrapper {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
