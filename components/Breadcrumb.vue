<template>
  <v-breadcrumbs :items="breadCrumb" divider="-">

  </v-breadcrumbs>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    computed: {
      paths() {
        return this.$Paths(this.$router);
      },
      breadCrumb() {
        let items = [];
        let current = this.paths.getPath(this.$route.path);
        let temp = current;
        let node = path => {
          return {
            text: path.name,
            href: path.path,
            link: true,
            disabled: this.$route.path == path.path
          };
        };
        
        while (temp.parent) {
          items.push(node(temp));
          temp = temp.parent;
        }
        items.push(node(temp));
        return items.reverse();
      },
    },
  };
</script>

<style lang="scss">

</style>
