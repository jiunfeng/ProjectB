import Phaser from 'phaser'
import phaserJuice from "@/components/game/js/phaserJuice.min.js";
import pumpkin_devil from '@/components/game/assets/sprites/pumpkin-devil.png'

import lifeBall from '@/components/game/assets/sprites/lifeball.png'
// import particles from '@/components/game/assets/sprites/particles.png'
import { toRaw } from 'vue';

import healthBar from '@/components/game/scenes/class/healthBar.js';
import monster from '@/components/game/scenes/class/monster.js';

import { useUserInfoStore } from '@/stores/userInfo';
const UserInfoStore = useUserInfoStore();
import { useDungeonStore } from '@/stores/gameDungeon';
const DungeonStore = useDungeonStore();


export default class Secondary extends Phaser.Scene {
  constructor() {
    super({ key: 'Secondary' })//場景命名
  }
  init() {
    this.gameWidth = this.game.config.width;
    this.mainScenes = this.scene.get('Main');
    this.fullHp = 0;
    //關卡假資料
    // this.stage = new Map();
    // this.stage.set('1', [
    //   {
    //     id: '001',
    //     cd: 1,
    //     hp: 300,
    //     attack: 30
    //   },
    //   {
    //     id: '002',
    //     cd: 2,
    //     hp: 300,
    //     attack: 30
    //   },
    //   {
    //     id: '002',
    //     cd: 3,
    //     hp: 300,
    //     attack: 30
    //   },
    // ]);
    // this.stage.set('2', [
    //   {
    //     id: '001',
    //     cd: 3,
    //     hp: 300,
    //     attack: 30
    //   },
    //   {
    //     id: '001',
    //     cd: 3,
    //     hp: 300,
    //     attack: 30
    //   },
    // ]);
    // this.stage.set('3', [
    //   {
    //     id: '003',
    //     cd: 3,
    //     hp: 300,
    //     attack: 30
    //   },
    // ]);
    // this.stageIterator = this.stage.entries();
    DungeonStore.entryDungeon("1-1")//填充關卡假資料
    // console.log('關卡假資料:')
    this.stage = toRaw(DungeonStore.enemyInfo);
    // console.log(this.stage);
    this.stageIterator = this.stage.entries();
  }
  reudceMonstersCd() {
    this.monsterGroup.getChildren().forEach(item => {
      item.reudceCd();
    });
  }
  nextStage() {
    const nextEntry = this.stageIterator.next();
    if (!nextEntry.done) {
      let [key, value] = nextEntry.value;
      let [x, y, gap, sizeRatio] = [
        this.game.config.width / 2,
        (this.heros[0].body.y - this.heros[0].body.displayHeight) / 2,
        0,
        0.4
      ]
      switch (value.length) {
        case 1:
          break;
        case 2:
          x -= 65;
          gap = 130;
          sizeRatio = 0.2;
          break;
        case 3:
          x -= 125;
          gap = 125;
          sizeRatio = 0.2;
          break;
      }
      let m;
      value.forEach((item, index) => {
        //scene, x, y, texture, ratio, hp, cd, attack,attribute
        this.monsterGroup.add(monster(this, x + index * gap, y, `monster${item[0]}`, sizeRatio, item[2], item[4], item[3], item[1]));
      });
    }
    else {
      console.log('勝利');
    }
  }
  preload() {
    this.load.image('pumpkin_devil', pumpkin_devil);
    this.load.image('lifeBall', lifeBall);
    this.load.spritesheet("particles", 'sprites/particles.png', {
      frameWidth: 50,
      frameHeight: 50
    });
    this.heros = [];
    for (let [key, value] of UserInfoStore.userpetset) {
      this.fullHp += value.health;
      this.heros.push(toRaw(value));
      this.load.image(`hero${key}`, `sprites/hero/${value.id}.png`);
    }
    const monsterImg = [];
    for (let value of this.stage.values()) {
      value.forEach(item => {
        if (!monsterImg.includes(item[0])) {
          monsterImg.push(item[0]);
          this.load.image(`monster${item[0]}`, `sprites/monster/${item[0]}.png`);
        }
      });
    }
  }
  create() {
    this.juice = new phaserJuice(this);
    const y = this.mainScenes.boardGroup.getFirst(true).y;
    this.lifeBall = this.physics.add.image(8, y, 'lifeBall').setOrigin(0, 1).setScale(0.085).setBodySize(300, 300);

    this.cure = {
      x: this.lifeBall.x + this.lifeBall.displayWidth / 2,
      y: this.lifeBall.y - this.lifeBall.displayHeight / 2
    };

    this.addHero()
    this.monsterGroup = this.add.group();
    this.nextStage();
  }
  addHero() {
    const hpBarConfig = {
      width: 350,
      height: 20
    }
    this.redHero = [];
    this.blueHero = [];
    this.greenHero = [];
    this.createPlayerHpBar(this.lifeBall.x + this.lifeBall.displayWidth, this.lifeBall.y, hpBarConfig.width, hpBarConfig.height, 5, this.fullHp);
    const gap = (350 - 70 * 3) / 3
    let [x, y] = [
      this.lifeBall.x + this.lifeBall.displayWidth + (350 - 70 * 3) / 6,
      this.lifeBall.y - hpBarConfig.height
    ];
    for (let i = 0; i < 3; i++) {
      this.heros[i].body = this.physics.add.image(x + 70 * i + gap * i, y, `hero${i + 1}`).setOrigin(0, 1).setScale(0.7).setBodySize(50, 50);
      this.heros[i].body.text = this.add.text(this.heros[i].body.x + this.heros[i].body.displayWidth / 2, this.heros[i].body.y - this.heros[i].body.displayHeight / 2, ``, { fontFamily: 'Arial Black', fontSize: 35, color: '#000000', stroke: '#dddddd', strokeThickness: 5 }).setOrigin(0.5);
      this.heros[i].body.tweens = [];
      this.heros[i].body.lastValue = 0;
      this.heros[i].body.X = this.heros[i].body.x + this.heros[i].body.displayWidth / 2;
      this.heros[i].body.Y = this.heros[i].body.y - this.heros[i].body.displayWidth / 2;

      console.log(this.heros[i]);
      switch (this.heros[i].attribute) {
        case '1':
          this.heros[i].body.text.setColor('#ff0000');
          this.redHero.push({
            hero: this.heros[i].body
          });
          break;
        case '2':
          this.heros[i].body.text.setColor('#0000ff');
          this.blueHero.push({
            hero: this.heros[i].body
          });
          break;
        case '3':
          this.heros[i].body.text.setColor('#00ff00');
          this.greenHeroHero.push({
            hero: this.heros[i].body
          });
          break;
      }
    }
  }
  createPlayerHpBar(x, y, fullWidth, height, radius, hp) {
    this.playerHealthBar = new healthBar(this, x, y, fullWidth, height, radius, hp);
    const fontSize = 16;
    this.playerHpText = this.add.text(x + fullWidth, y, `${hp}/${hp}`, { fontFamily: 'Arial Black', fontSize: fontSize, color: '#dddddd' });
    this.playerHpText.setOrigin(1.1, 1)
    this.playerHpText.setStroke('#555555', 1);

    this.playerHpVarietyText = this.add.text(x + fullWidth / 2, y - height / 2, ``, { fontFamily: 'Arial Black', fontSize: 64, color: '#dddddd' }).setDepth(2);
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
      this.playerGotHurtAnimate(test2, false);//第二參數用來判斷是否為最後的攻擊
    });
  }
  playerGotHurtAnimate(value, final = false) {
    this.playerHealthBar.shake(new phaserJuice(this));
    if (!this.shakeLifeBall || !this.shakeLifeBall.shakeTween.isPlaying()) {
      this.shakeLifeBall = this.juice.shake(this.lifeBall);
    }

    const lastHp = this.playerHealthBar.reduceHp(value);
    this.playerHealthBar.setHpPercentageAnimated(lastHp / this.fullHp).then(result => {
      console.log(result);
      if (final) {
        this.hpVarietyStartValue = 0;
        if (lastHp == 0) {
          console.log('game over');
        }
      }
    });
    if (this.HpVarietyTextTweens[0] && this.HpVarietyTextTweens[1] && this.HpVarietyTextTweens[2]) {
      this.HpVarietyTextTweens[0].stop();
      this.HpVarietyTextTweens[1].stop();
      this.HpVarietyTextTweens[2].stop();
    }

    this.setPlyaerHpVarietyTextAnimated('-', this.hpVarietyStartValue + value, false);
    this.hpVarietyStartValue += value;
    this.playerHpText.setText(`${lastHp}/${this.playerHealthBar.getFullHp()}`);
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
  //消珠發射粒子
  shot(balls, color) {
    balls.forEach(ball => {
      this.physics.add.existing(ball.ball);
      this.physics.add.overlap(ball.ball, ball.overLapItem, (self, overLapItem) => {
        overLapItem.text.setVisible(true);
        if (overLapItem.tweens[0] && overLapItem.tweens[1]) {
          overLapItem.tweens[0].stop();
          overLapItem.tweens[1].stop();
        }
        this.setHeroVarietyTextAnimated(overLapItem.text, overLapItem.lastValue, overLapItem.lastValue + ball.value, overLapItem.tweens);
        overLapItem.lastValue += ball.value;
        self.destroy();
      }, null, this);

      const particles = this.add.particles(0, 0, 'particles', {
        frame: color - 1,
        speed: 100,
        scale: { start: 0.7, end: 0 },
        lifespan: 800,
        angle: { min: -120, max: -80 },
        scale: { start: 0.70, end: 0, ease: 'sine.out' },
        blendMode: 'ADD',
        follow: ball.ball
      });


      this.tweens.add({
        targets: ball.ball,
        x: ball.toX,
        y: ball.toY,
        duration: 500,
        ease: 'Linear',
        onComplete() {
          console.log('完成');
          particles.destroy();
        }
      });

    });
  }
  accumulationAnimate(x, y, value, color) {
    let balls = [];
    switch (color) {
      case '1':
        if (this.redHero.length != 0) {
          this.redHero.forEach(item => {
            balls.push({
              ball: this.add.circle(x, y, 10, 0x6666ff).setOrigin(0.5, 0.5),
              toX: item.hero.X,
              toY: item.hero.Y,
              overLapItem: item.hero,
              value
            });
          });
          this.shot(balls, 1);
        }
        break;
      case '2':
        if (this.blueHero.length != 0) {
          this.blueHero.forEach(item => {
            balls.push({
              ball: this.add.circle(x, y, 10, 0x6666ff).setOrigin(0.5, 0.5),
              toX: item.hero.X,
              toY: item.hero.Y,
              overLapItem: item.hero,
              value
            });
          });
          this.shot(balls, 2);
        }
        break;
      case '3':
        if (this.greenHero.length != 0) {
          this.blueHero.forEach(item => {
            balls.push({
              ball: this.add.circle(x, y, 10, 0x6666ff).setOrigin(0.5, 0.5),
              toX: item.hero.X,
              toY: item.hero.Y,
              overLapItem: item.hero,
              value
            });
          });
          this.shot(balls, 3);
        }
        break;
      case '4':
        let toX = 0, toY = 0;
        let ball = this.add.circle(x, y, 10, 0x6666ff).setOrigin(0.5, 0.5);
        if (color == 4) {
          toX = this.cure.x;
          toY = this.cure.y;
          this.physics.add.existing(ball);
          this.physics.add.overlap(this.lifeBall, ball, (self, ball) => {
            this.playerCureAnimate(value);
            ball.destroy();
          }, null, this);
        }
        const particles = this.add.particles(0, 0, 'particles', {
          frame: color - 1,
          speed: 100,
          scale: { start: 0.7, end: 0 },
          lifespan: 800,
          angle: { min: -120, max: -80 },
          scale: { start: 0.70, end: 0, ease: 'sine.out' },
          blendMode: 'ADD',
          active: false
        });
        particles.startFollow(ball);
        particles.active = true
        this.tweens.add({
          targets: ball,
          x: toX,
          y: toY,
          duration: 500,
          ease: 'Linear',
          callbackScope: this,
          onComplete() {
            console.log('完成');
            particles.destroy();
          }
        });
        break;
    }
  }
  heroAttack(values) {
    const sc = this;
    function shot(balls, color) {
      balls.forEach((ball, index) => {
        sc.physics.add.existing(ball.ball);
        sc.physics.add.overlap(ball.ball, ball.overLapItem, (self, overLapItem) => {
          overLapItem.gotHurt(ball.attackValue).then(result => {
            console.log(result)
            if (index == balls.length - 1) {
              if (ball.finalAttack) {
                sc.checkStageWin();
              }
            }
          });
          // if(sc.monsterGroup.getChildren()[0]==overLapItem){
          //   console.log(ball.final);
          //   // overLapItem.gotHurt(ball.attackValue,ball.final);
          // }
          self.destroy();
        }, null, this);

        const particles = sc.add.particles(0, 0, 'particles', {
          frame: color,
          speed: 100,
          scale: { start: 0.7, end: 0 },
          lifespan: 800,
          angle: { min: -120, max: -80 },
          scale: { start: 0.70, end: 0, ease: 'sine.out' },
          blendMode: 'ADD',
          follow: ball.ball
        });
        sc.tweens.add({
          targets: ball.ball,
          x: ball.toX,
          y: ball.toY,
          duration: 500,
          ease: 'Linear',
          onComplete() {
            console.log('完成');
            ball.text.setVisible(false);
            particles.destroy();
          }
        });

      });
    }
    let finalAttackIndex;
    this.heros.forEach((hero, index) => {
      const attribute = hero.attribute;
      const attackValue = values[attribute - 1][0];
      if (attackValue != 0) {
        finalAttackIndex = index;
      }
    });
    if (finalAttackIndex) {
      this.heros.forEach((hero, index) => {
        const attribute = hero.attribute;
        const allAttack = values[attribute - 1][1];
        const attackValue = values[attribute - 1][0];
        this.setHeroVarietyTextAnimated(hero.body.text, hero.body.lastValue, attackValue, hero.body.tweens);
        hero.body.lastValue = 0;
        if (attackValue != 0) {
          if (allAttack) {
            const balls = [];
            for (let i = 0; i < this.monsterGroup.getLength(); i++) {
              balls.push(
                {
                  ball: this.add.circle(hero.body.X, hero.body.Y, 10, 0x6666ff).setOrigin(0.5, 0.5),
                  toX: this.monsterGroup.getChildren()[i].x,
                  toY: this.monsterGroup.getChildren()[i].y,
                  overLapItem: this.monsterGroup.getChildren(),
                  attackValue,
                  text: hero.body.text,
                  finalAttack: index == finalAttackIndex ? true : false
                  // final: index == finalIndex ? true : false,
                  // allfinal: index == allfinalIndex ? true : false
                }
              )
            }
            shot(balls, hero.attribute - 1);
          }
          else {
            const ball = [
              {
                ball: this.add.circle(hero.body.X, hero.body.Y, 10, 0x6666ff).setOrigin(0.5, 0.5),
                toX: this.monsterGroup.getChildren()[0].x,
                toY: this.monsterGroup.getChildren()[0].y,
                overLapItem: this.monsterGroup.getChildren()[0],
                attackValue,
                text: hero.body.text,
                finalAttack: index == finalAttackIndex ? true : false
                // final: index == finalIndex ? true : false,
                // allfinal: index == allfinalIndex ? true : false
              }
            ]
            shot(ball, hero.attribute - 1);
          }
        }
      });
    }
    else {
      //確認monster CD 發動攻擊
      console.log('確認CD');
      this.checkMonstersCd();
    }
  }
  checkMonstersCd() {
    new Promise(resolve => {
      this.monsterGroup.getChildren().forEach((item, index, arr) => {
        if (item.checkCd()) {
          const attackInfo = item.getAttack();
          let ball =this.add.circle(item.x,item.y,10, 0x6666ff);
          ball.attack=attackInfo.attack;
          ball.attribute=attackInfo.attribute;
          const [toX,toY]=[
            this.playerHealthBar.getX()+this.playerHealthBar.getWidth()/2,
            this.playerHealthBar.getY()-this.playerHealthBar.getHeight()/2
          ];
          this.tweens.add({
            targets: ball,
            x:toX,
            y: toY,
            duration: 2500,
            ease: 'linear',
            callbackScope: this,
            onComplete: () => {
              ball.destroy();
              console.log(arr.length)
              if(index==arr.length-1){
                this.playerGotHurtAnimate(ball.attack, true);//第二參數用來判斷是否為最後的攻擊
              }
              else{
                this.playerGotHurtAnimate(ball.attack, false);//第二參數用來判斷是否為最後的攻擊
              }
            },
          });
        }
      });
    });
  }
  checkStageWin() {
    if (this.monsterGroup.getLength() == 0) {
      this.nextStage();
    }
    else {
      //確認monster CD 發動攻擊
      console.log('確認CD');
      this.checkMonstersCd();
    }
  }
  setHeroVarietyTextAnimated(target, value, newValue, tween) {
    tween[0] = this.tweens.addCounter({
      from: value,
      to: newValue,
      duration: 1500,
      ease: 'linear',
      onUpdate: tween => {
        const value = Math.round(tween.getValue());
        target.setText(value);
      }
    });
    tween[1] = this.tweens.addCounter({
      from: 64,
      to: 20,
      duration: 1500,
      ease: 'linear',
      callbackScope: this,
      onUpdate: tween => {
        const value = Math.round(tween.getValue());
        target.setFontSize(value);
      },
      onComplete: () => {
      },
      completeDelay: 1500
    });
  }
}
