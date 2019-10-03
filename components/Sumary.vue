<template>

<content-card :title="path.name" width="400">
    
    <v-list>
        <v-list-item
          v-for="(item, i) in categories"
          :key="i"
          :to="item.path"
        >
          <v-list-item-icon>
            <span class="number">{{ i }}</span>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" class="name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  
</content-card>



</template>

<script>
  import ContentCard from './ContentCard';
  export default {
    name: 'Sumary',
    components: { ContentCard },
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
  
  .number {
    font-weight: bold;
    &:before {
      content: "#";
      font-style: italic;
      color: lightgray;
      font-size: 24px;
    }
  }
  

  /*.name {*/
  /*  color: #1976D2;*/
  /*}*/
</style>
