import Phaser from 'phaser'
import RoundRectangleCanvasPlugin from 'phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js';
import Main from '@/components/game/scenes/main'
import Secondary from '@/components/game/scenes/secondary'
import Dun from '@/components/game/scenes/dun'
import OverGame from './scenes/overGame';
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
    scene: [Dun, Main, Secondary,OverGame],
    plugins: {
      global: [
        {
          key: 'rexRoundRectangleCanvas',
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
