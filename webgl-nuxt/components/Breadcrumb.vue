<template>
  <v-breadcrumbs :items="breadCrumb">
<!--    <template v-slot:divider>-->
<!--      <v-icon>chevron_right</v-icon>-->
<!--    </template>-->
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
            to: path.path,
            link: true,
            disabled: false,
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

<style lang="scss" scoped>

</style>
