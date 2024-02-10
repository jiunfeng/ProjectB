import Phaser from 'phaser'
import RoundRectangleCanvasPlugin from 'phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js';
import PlayGame from '@/components/game/scenes/PlayGame'
import test from '@/components/game/scenes/test'
function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 414,
    height: 736,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      }
    },
    scene: [PlayGame, test],
    plugins: {
      global: [{
        key: 'rexRoundRectangleCanvasPlugin',
        plugin: RoundRectangleCanvasPlugin,
        start: true
      },
        // ...
      ]
    }
  })
}

export default launch
export { launch }
