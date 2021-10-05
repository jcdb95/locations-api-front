<template>
  <div id="app">
    <stations-map />
  </div>
</template>

<script>
import StationsMap from './components/StationsMap.vue'

export default {
  name: 'App',
  components: {
    StationsMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
