<script setup>
import { onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const game = await import('@/components/game/game')

onMounted(() => {
  gameInstance = game.launch(containerId)
  window.focus()
  resize();
  window.addEventListener("resize", resize, false);
})

onUnmounted(() => {
  gameInstance.destroy(false)//phaser.game.destroy()消除遊戲實例 (false)消除遊戲實例但不清除緩存
})

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = gameInstance.config.width / gameInstance.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
</script>

<template>
  <div :id="containerId" />
</template>

