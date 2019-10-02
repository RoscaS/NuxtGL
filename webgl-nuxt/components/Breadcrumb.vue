<template>
  <h1>Breadcrumb</h1>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    computed: {
      routes() {
        let routes = this.$router.options.routes;
        let shaders = i => i.includes('/vertex') || i.includes('/fragment');
        let number = i => parseInt(i.slice(0, 2));
        return routes
          .filter(i => !shaders(i.path))
          .map(i => { return { name: i.name, path: i.path };})
          .sort((a, b) => number(a.name) - number(b.name))
      },
    },
    mounted() {
      console.log(this.routes);
    },
  };
</script>

<style lang="scss" scoped>

</style>
