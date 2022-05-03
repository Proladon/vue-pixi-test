<template>
<div  id="game" >
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import app from './game.js'
onMounted(async() => {
  await app()
})
</script>

<style>

</style>
