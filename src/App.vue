<template>
  <button style="margin-bottom: 30px" @click="showDemo = !showDemo">Show Demo</button>
  <div class="demo" v-if="showDemo">
    <game />
  </div>

  <div id="practice"  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import game from './pixi/game/game.vue'
const showDemo = ref(false)

onMounted(() => {})


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
