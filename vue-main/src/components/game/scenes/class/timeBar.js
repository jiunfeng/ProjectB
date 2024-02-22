
export default class timeBar {
    #healthColor = {
        green: [0x73d544, 0x1Ba93E, false],
        orange: [0xFd6E18, 0xc47157, false],
        red: [0xff1B05, 0xac353A, false]
    }
    #scene
    #fullWidth

    #timeBar
    #timeBarFrame
    #timeBarShadow


    #timeTween
    constructor(scene, x, y, fullWidth, height, radius) {
        //rexRoundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, strokeWidth, fillColor2, isHorizontalGradient)
        const FrameStrokeWidth = 2.5;
        this.#timeBarFrame = scene.add.rexRoundRectangleCanvas(x, y, fullWidth, height, radius, null, 0xF6C555, FrameStrokeWidth, null, false).setVisible(false);
        this.#timeBarFrame.setOrigin(0, 1);

        const [FrameX, FrameY] = [this.#timeBarFrame.x, this.#timeBarFrame.y];

        this.#timeBarShadow = scene.add.rexRoundRectangleCanvas(FrameX + FrameStrokeWidth, FrameY - height / 2, fullWidth - FrameStrokeWidth * 2, height - FrameStrokeWidth * 2, radius, 0xffffff, 0x000000, 0, 0xffffff, false).setVisible(false);
        this.#timeBarShadow.setOrigin(0, 0.5);
        this.#timeBarShadow.setAlpha(0.2);


        this.#timeBar = scene.add.rexRoundRectangleCanvas(FrameX + FrameStrokeWidth, FrameY - height / 2, fullWidth - FrameStrokeWidth * 2, height - FrameStrokeWidth * 2, radius, 0x000000, 0x000000, 0, 0x000000, false).setVisible(false);
        this.#timeBar.setOrigin(0, 0.5);
        this.#timeBar.setFillStyle(...this.#healthColor.green);

        this.#scene = scene;
        this.#fullWidth = fullWidth - FrameStrokeWidth * 2;

    }
    shake(juice) {
        if (!this.shaketimeBarFrame || !this.shaketimeBarFrame.shakeTween.isPlaying()) {
            this.shaketimeBarFrame = juice.shake(this.#timeBarFrame);
        }
        if (!this.shaketimeBarShadow || !this.shaketimeBarShadow.shakeTween.isPlaying()) {
            this.shaketimeBarShadow = juice.shake(this.#timeBarShadow);
        }

        if (!this.shaketimeBar || !this.shaketimeBar.shakeTween.isPlaying()) {
            this.shaketimeBar = juice.shake(this.#timeBar);
        }
    }

    #setColor(percent) {
        if (percent <= 0.3) {
            // 小於等於 0.3 時轉成紅色
            this.#timeBar.setFillStyle(...this.#healthColor.red);
        }
        else if (percent <= 0.7) {
            // 小於等於 0.7 時轉成橘色
            this.#timeBar.setFillStyle(...this.#healthColor.orange);
        }
        else {
            // 大於 0.7 時綠色
            this.#timeBar.setFillStyle(...this.#healthColor.green);
        }
    }

    #show() {
        this.#timeBarFrame.setVisible(true);
        this.#timeBarShadow.setVisible(true);
        this.#timeBar.setVisible(true);
    }
    startCountingDown(time=15) {
        return new Promise(resolve => {
            this.#show();
            this.#timeTween=this.#scene.tweens.add({
                targets: this.#timeBar,
                width: 0,
                duration:time*1000,
                ease: 'Linear',
                onUpdate: tween => {
                    this.#timeBarFrame.visible = this.#timeBar.width > 0
                    this.#timeBarShadow.visible = this.#timeBar.width > 0
                    this.#timeBar.visible = this.#timeBar.width > 0
                    this.#setColor(tween.getValue() / this.#fullWidth);
                },
                callbackScope: this,
                onComplete: () => {
                    this.#timeBarFrame.setVisible(false);
                    this.#timeBarShadow.setVisible(false);
                    this.#timeBar.setVisible(false);
                    this.#timeBar.width=this.#fullWidth;
                    resolve('啟動消珠');
                }
            })
        });
    }
    stopCountingDown() {
        if(this.#timeTween.isPlaying()) this.#timeTween.complete();;
    }
}

