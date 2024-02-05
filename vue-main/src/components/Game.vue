<template>
    <div id="game">

    </div>
</template>
<script>
import Game from '@/components/game/game.js'
export default {
    name: 'game',
    mounted() {
        window.Phaser = new Game()
    },
    destroyed() {
        window.Phaser.destroy()
    }
}
</script>
<style scoped>
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