import Phaser from 'phaser'
import pumpkin_devil from '@/components/game/assets/sprites/pumpkin-devil.png'
import healthBar from '@/components/game/scenes/class/healthBar.js';
export default class test extends Phaser.Scene {
  constructor() {
    super({ key: 'test' })//場景命名
  }
  init() {
    this.gameWidth = this.game.config.width;
  }
  preload() {
    this.load.image('pumpkin_devil', pumpkin_devil);
  }
  create() {
    this.physics.add.image(this.gameWidth / 2, 0, 'pumpkin_devil').setOrigin(0.5, 0).setScale(0.15);
    this.createPlayerHpBar(50, 50, 300, 25, 5, 1000);
  }
  createPlayerHpBar(x, y, fullWidth, height, radius, hp) {
    this.playerHealthBar = new healthBar(this, x, y, fullWidth, height, radius, hp);

    const fontSize = 16;
    this.playerHpText = this.add.text(x + fullWidth, y + height / 2, `${hp}/${hp}`, { fontFamily: 'Arial Black', fontSize: fontSize, color: '#dddddd' });
    this.playerHpText.setOrigin(1.1, 0.5)
    this.playerHpText.setStroke('#555555', 1);

    this.playerHpVarietyText = this.add.text(x + fullWidth / 2, y + height / 2, ``, { fontFamily: 'Arial Black', fontSize: 64, color: '#dddddd' });
    this.playerHpVarietyText.setOrigin(0.5, 0.5)
    this.playerHpVarietyText.setStroke('#555555', 2);
    this.playerHpVarietyText.setVisible(false);

    this.HpVarietyTextTweens = [];//用來存放要中斷的tweens
    this.hpVarietyStartValue = 0;//確定結束時要歸0

    //模擬恢復效果
    const cureButton = this.add.rexRoundRectangleCanvas(100, 200, 100, 50, 5, 0x73d544, 0x000000, 0, 0x1Ba93E, false);
    cureButton.setInteractive();
    cureButton.on('pointerdown', () => {
      this.playerCure(this.hpVarietyStartValue, 500);
      this.hpVarietyStartValue += 500;
    });

    //模擬受傷效果
    const hurtButton = this.add.rexRoundRectangleCanvas(300, 200, 100, 50, 5, 0xff1B05, 0x000000, 0, 0xac353A, false);
    let p = 0.9;
    hurtButton.setInteractive();
    hurtButton.on('pointerdown', () => {
      this.playerGotHurt(this.hpVarietyStartValue, 500, 0.5);
      this.hpVarietyStartValue += 500;
      p -= 0.1;
      // console.log(p)
    });
  }
  playerGotHurt(startValue, variation, percent) {
    console.log(percent);
    const lastHp = this.playerHealthBar.reduceHp(variation);
    this.playerHealthBar.setHpPercentageAnimated(percent);
    if (this.HpVarietyTextTweens[0] && this.HpVarietyTextTweens[1] && this.HpVarietyTextTweens[2]) {
      this.HpVarietyTextTweens[0].stop();
      this.HpVarietyTextTweens[1].stop();
      this.HpVarietyTextTweens[2].stop();
    }
    this.setPlyaerHpVarietyTextAnimated('-', startValue, variation)
    this.playerHpText.setText(`${lastHp}/${this.playerHealthBar.getFullHp()}`);
    if (lastHp == 0) {
      console.log('game over');
      return;
    }
  }
  playerCure(startValue, variation) {
    console.log('cure')
    if (this.HpVarietyTextTweens[0] && this.HpVarietyTextTweens[1]) {
      this.HpVarietyTextTweens[0].stop();
      this.HpVarietyTextTweens[1].stop();
    }
    this.setPlyaerHpVarietyTextAnimated('+', startValue, variation);
  }
  setPlyaerHpVarietyTextAnimated(symbol, startValue, variation) {
    this.playerHpVarietyText.setVisible(true);
    const [currentFontSize, currentY] = [
      parseInt(this.playerHpVarietyText.style.fontSize.substr(0, 2)),
      this.playerHpVarietyText.y
    ]
    this.HpVarietyTextTweens[0] = this.tweens.addCounter({
      from: startValue,
      to: startValue + variation,
      duration: 1500,
      ease: 'linear',
      onUpdate: tween => {
        const value = Math.round(tween.getValue());
        this.playerHpVarietyText.setText(symbol + value);
      }
    });
    this.HpVarietyTextTweens[1] = this.tweens.addCounter({
      from: currentFontSize,
      to: 20,
      duration: 1500,
      ease: 'linear',
      callbackScope: this,
      onUpdate: tween => {
        const value = Math.round(tween.getValue());
        this.playerHpVarietyText.setFontSize(value);
      },
      onStop: () => {
        this.playerHpVarietyText.setFontSize(currentFontSize);
      },
      onComplete: () => {
        this.playerHpVarietyText.setFontSize(currentFontSize);
        this.playerHpVarietyText.setVisible(false);
      },
      completeDelay: 1500
    });
    if (symbol === '-') {
      this.playerHpVarietyText.setColor('#DB4D6D')
      this.HpVarietyTextTweens[2] = this.tweens.add({
        targets: this.playerHpVarietyText,
        y: currentY - 30,
        duration: 2500,
        ease: 'linear',
        callbackScope: this,
        onStop: () => {
          this.playerHpVarietyText.setY(currentY);
        },
        onComplete: () => {
          this.playerHpVarietyText.setY(currentY);
        },
        completeDelay: 1500
      });
    }
    else this.playerHpVarietyText.setColor('#86C166')
  }

}
