<template>
    <Game />
</template>
<script setup>
import Game from '@/components/game/Game.vue'
</script>
<style>
body {
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
