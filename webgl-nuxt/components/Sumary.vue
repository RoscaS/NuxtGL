<template>
  
  <v-card width="400">
    <v-card-title class="headline">
      {{ path.name }}
    </v-card-title>
    <v-card-text>
      
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            nuxt
            v-for="(cat, i) in categories"
            :key="i"
            :to="cat.path"
          >
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ i + 1 }} - {{ cat.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      
    </v-card-text>
  </v-card>
  

</template>

<script>
  export default {
    name: 'Sumary',
    computed: {
      paths() {
        return this.$Paths(this.$router);
      },
      path() {
        return this.paths.getPath(this.$route.path);
      },
      categories() {
        if (this.path.name == "Home") {
          return this.paths.getCategories().filter(i => i.name !== "Home");
        } else {
          return this.paths.list
            .filter(i => i.path.includes(this.path.path))
            .splice(1)
        }
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
