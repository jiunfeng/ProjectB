import Phaser from 'phaser'

import PlayGame from '@/game/scenes/PlayGame'
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
    scene: [PlayGame]
  })
}

export default launch
export { launch}
