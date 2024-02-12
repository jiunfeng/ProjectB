import Phaser from 'phaser'

import pumpkin_devil from '@/components/game/assets/sprites/pumpkin-devil.png'
import lifeBall from '@/components/game/assets/sprites/lifeball.png'

import healthBar from '@/components/game/scenes/class/healthBar.js';

import { useUserInfoStore } from '@/stores/userInfo';
const DungeonStore = useUserInfoStore();

export default class Secondary extends Phaser.Scene {
  constructor() {
    super({ key: 'Secondary' })//場景命名
  }
  init() {
    this.gameWidth = this.game.config.width;
    this.mainScenes = this.scene.get('Main');
  }
  preload() {
    this.load.image('pumpkin_devil', pumpkin_devil);
    this.load.image('lifeBall', lifeBall);

  }
  create() {
    this.physics.add.image(this.gameWidth / 2, 0, 'pumpkin_devil').setOrigin(0.5, 0).setScale(0.15);
    const y = this.mainScenes.boardGroup.getFirst(true).y;
    this.lifeBall = this.physics.add.image(8, y, 'lifeBall').setOrigin(0, 1).setScale(0.085).setBodySize(300, 300);
    this.addHero()
  }

  addHero() {
    this.fullHp = 0;
    for (let [key, value] of DungeonStore.userpetset) {
      this.fullHp += value.health;
    }
    this.createPlayerHpBar(this.lifeBall.x + this.lifeBall.displayWidth, this.lifeBall.y, 350, 20, 5, this.fullHp);
  }
  createPlayerHpBar(x, y, fullWidth, height, radius, hp) {
    this.playerHealthBar = new healthBar(this, x, y, fullWidth, height, radius, hp);
    const fontSize = 16;
    this.playerHpText = this.add.text(x + fullWidth, y, `${hp}/${hp}`, { fontFamily: 'Arial Black', fontSize: fontSize, color: '#dddddd' });
    this.playerHpText.setOrigin(1.1, 1)
    this.playerHpText.setStroke('#555555', 1);

    this.playerHpVarietyText = this.add.text(x + fullWidth / 2, y - height / 2, ``, { fontFamily: 'Arial Black', fontSize: 64, color: '#dddddd' });
    this.originFontSize = this.playerHpVarietyText.style.fontSize.substr(0, 2);
    this.playerHpVarietyText.setOrigin(0.5, 0.5)
    this.playerHpVarietyText.setStroke('#555555', 2);
    this.playerHpVarietyText.setVisible(false);

    this.HpVarietyTextTweens = [];//用來存放要中斷的tweens
    this.hpVarietyStartValue = 0;

    //模擬受傷效果
    const hurtButton = this.add.rexRoundRectangleCanvas(300, 200, 100, 50, 5, 0xff1B05, 0x000000, 0, 0xac353A, false);

    hurtButton.setInteractive();
    let test2 = 20
    hurtButton.on('pointerdown', () => {
      this.playerGotHurtAnimate(test2);
      
    });
  }
  playerGotHurtAnimate(value,final=false) {
    const lastHp = this.playerHealthBar.reduceHp(value);
    this.playerHealthBar.setHpPercentageAnimated(lastHp / this.fullHp);
    if (this.HpVarietyTextTweens[0] && this.HpVarietyTextTweens[1] && this.HpVarietyTextTweens[2]) {
      this.HpVarietyTextTweens[0].stop();
      this.HpVarietyTextTweens[1].stop();
      this.HpVarietyTextTweens[2].stop();
    }

    this.setPlyaerHpVarietyTextAnimated('-', this.hpVarietyStartValue + value,false);
    this.hpVarietyStartValue+=value;
    this.playerHpText.setText(`${lastHp}/${this.playerHealthBar.getFullHp()}`);
    if (lastHp == 0) {
      console.log('game over');
      return;
    }
    if(final)this.hpVarietyStartValue = 0;
  }

  playerCureAnimate(value) {
    if (this.HpVarietyTextTweens[0] && this.HpVarietyTextTweens[1]) {
      this.HpVarietyTextTweens[0].stop();
      this.HpVarietyTextTweens[1].stop();
    }
    this.setPlyaerHpVarietyTextAnimated('+', this.hpVarietyStartValue + value);
    this.hpVarietyStartValue += value;
  }
  playerCure(value) {
    this.setPlyaerHpVarietyTextAnimated('+', value, false);
    const lastHp = this.playerHealthBar.increaseHp(value);
    this.playerHealthBar.setHpPercentageAnimated(lastHp / this.fullHp);
    this.playerHpText.setText(`${lastHp}/${this.playerHealthBar.getFullHp()}`);
    this.hpVarietyStartValue = 0;
  }
  setPlyaerHpVarietyTextAnimated(symbol, value, visible = true) {
    this.playerHpVarietyText.setVisible(true);
    this.playerHpVarietyText.setFontSize(this.originFontSize);
    const [currentFontSize, currentY] = [
      parseInt(this.playerHpVarietyText.style.fontSize.substr(0, 2)),
      this.playerHpVarietyText.y
    ]

    this.HpVarietyTextTweens[0] = this.tweens.addCounter({
      from: this.hpVarietyStartValue,
      to: value,
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
      onComplete: () => {
        this.playerHpVarietyText.setVisible(visible);
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
