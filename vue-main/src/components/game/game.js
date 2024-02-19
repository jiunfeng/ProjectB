import Phaser from 'phaser'
import RoundRectangleCanvasPlugin from 'phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js';
import GrayScalePipelinePlugin from 'phaser3-rex-plugins/plugins/grayscalepipeline-plugin.js';
import Main from '@/components/game/scenes/main'
import Secondary from '@/components/game/scenes/secondary'
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
    scene: [Main, Secondary],
    plugins: {
      global: [
        {
          key: 'rexRoundRectangleCanvas',
          plugin: RoundRectangleCanvasPlugin,
          start: true
        },
        {
          key: 'rexGrayScalePipeline',
          plugin: GrayScalePipelinePlugin,
          start: true
        },

        // ...
      ]
    }
  })
}

export default launch
export { launch }
