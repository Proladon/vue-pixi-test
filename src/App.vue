<script setup>
import { onMounted } from 'vue';
import app from './pixi/app.js'
onMounted(async() => {
  await app()
})
</script>

<template>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
