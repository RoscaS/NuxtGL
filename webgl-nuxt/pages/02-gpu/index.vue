<template>
  <v-layout>
    <v-flex class="text-center">
      <h1>Hello WebGL</h1>
      <canvas width="300" height="300" id="webgl"></canvas>
      <Breadcrumb />
    </v-flex>
  </v-layout>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb';
export default {
  components: { Breadcrumb },
  name: 'Hello-WebGL',
};
</script>


<style lang="scss" scoped>

</style>
