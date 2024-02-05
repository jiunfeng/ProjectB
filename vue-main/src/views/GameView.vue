<script setup>
import Game from '@/components/Game.vue'
</script>

<template>
  <Game />
</template>

<style>
body {
  background: #0aa7c3;
  padding: 0px;
  margin: 0px;
}

canvas {
  display: block;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>