import Phaser from 'phaser'
export default class Dun extends Phaser.Scene {
    constructor() {
        super({ key: 'Dun' })//場景命名
    }
    preload() {
        this.load.image('dun', 'sprites/dun02.jpg');
    }
    create() {
        this.dunImage = this.add.image(this.game.config.width / 2, 395, 'dun').setOrigin(0.5, 1).setScale(0.6).setDepth(0);
        this.scene.run('Main');
        this.scene.run('OverGame');
        this.shakeY();
    }
    shakeY() {
        return new Promise(resolve => {
            this.tweens.add({
                targets: this.dunImage,
                y: 415,
                duration: 850,
                ease: 'sine.out',
                yoyo: true,
                repeat: 2,
                onComplete: function () {
                    console.log('背景移動完成');
                    resolve('背景移動完成');
                }
            });
        });
    }

}