export default class healthBar {
    #healthColor = {
        green: [0x73d544, 0x1Ba93E, false],
        orange: [0xFd6E18, 0xc47157, false],
        red: [0xff1B05, 0xac353A, false]
    }
    #scene
    #fullWidth
    
    #healthBar
    #healthBarShadow
    #fullHp
    #currentHp
    
    #x
    #y
    #height

    constructor(scene, x, y, fullWidth, height, radius, hp) {
        //rexRoundRectangleCanvas(x, y, width, height, radiusConfig, fillStyle, strokeStyle, strokeWidth, fillColor2, isHorizontalGradient)
        this.#healthBarShadow = scene.add.rexRoundRectangleCanvas(x, y, fullWidth, height, radius, 0x000000, 0x000000, 0, 0x000000, false);
        this.#healthBarShadow.setOrigin(0, 0);
        this.#healthBarShadow.setAlpha(0.1);

        this.#healthBar = scene.add.rexRoundRectangleCanvas(x, y, fullWidth, height, radius, 0x000000, 0x000000, 2, 0x000000, false);
        this.#healthBar.setOrigin(0, 0);
        this.#healthBar.setFillStyle(...this.#healthColor.green);

        this.#scene = scene;
        this.#fullWidth = fullWidth;
        this.#fullHp = hp;
        this.#currentHp = hp;
        this.#x=x;
        this.#y=y;
        this.#height=height;

        // console.log(this.#healthBar)
    }
   
    getX(){
        return this.#x;
    }
    getY(){
        return this.#y;
    }
    getWidth(){
        return this.#fullWidth;
    }
    getHeight(){
        return this.#height;
    }
    getFullHp(){
        return this.#fullHp;
    }
    increaseHp(variation) {
       return this.#currentHp=Phaser.Math.MaxAdd(this.#currentHp,variation,this.#fullHp);        
    }
    reduceHp(variation) {
       return this.#currentHp=Phaser.Math.MinSub(this.#currentHp,variation,0);
    }
    setHpPercentageAnimated(percent, duration = 2500) {
        const width = this.#fullWidth * percent
        this.#scene.tweens.add({
            targets: this.#healthBar,
            width: width,
            duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: tween => {
                this.#healthBar.visible = this.#healthBar.width > 0
                this.#setColor(tween.getValue() / this.#fullWidth);
            }
        })
    }
    #setColor(percent) {
        if (percent <= 0.3) {
            // 小於等於 0.3 時轉成紅色
            this.#healthBar.setFillStyle(...this.#healthColor.red);
        }
        else if (percent <= 0.7) {
            // 小於等於 0.7 時轉成橘色
            this.#healthBar.setFillStyle(...this.#healthColor.orange);
        }
        else {
            // 大於 0.7 時綠色
            this.#healthBar.setFillStyle(...this.#healthColor.green);
        }
    }
}

