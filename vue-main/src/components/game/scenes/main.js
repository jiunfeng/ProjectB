import Phaser from 'phaser'
import { toRaw } from 'vue';
import gems from '@/components/game/assets/sprites/gems.png'
import gemSwitchSound from '@/components/game/assets/audio/test.mp3'

import { useDrawcalStore } from "@/stores/gameRoundCal";
import { useDungeonStore } from '@/stores/gameDungeon';
const DrawcalStore = useDrawcalStore();
const DungeonStore = useDungeonStore();
//關卡敵人資料填充
DungeonStore.entryDungeon("1-1")
console.log(DungeonStore.enemyInfo);
// 關卡測試敵人資料填充
let gameOptions = {
  rowSize: 5,
  colSize: 6,
  gemColors: 4,
  gemSize: 100,
}
export default class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' })//場景命名
  }

  preload() {
    this.load.spritesheet("gems", gems, {
      frameWidth: gameOptions.gemSize,
      frameHeight: gameOptions.gemSize
    });
    this.load.audio('gemSwitchSound', gemSwitchSound);
  }
  create() {
    this.canDrag = true;
    this.input.mouse.disableContextMenu();
    // 获取游戏画布的 DOM 元素
    const canvasElement = this.game.canvas;

    // 添加 mouseleave 事件监听器
    canvasElement.addEventListener('mouseleave', function () {
      // console.log('鼠标离开游戏画布！');
      this.input.emit('pointerup');
    }.bind(this));


    this.input.on('gameobjectdown', (pointer, gameObject) => {

      if (pointer.leftButtonDown() && this.canDrag) {
        //this.isGem()判斷點擊的物件是不是寶石
        if (this.isGem(gameObject)) {
          gameObject.setDepth(2);
          this.dragGem = gameObject;
          this.prex = pointer.x;
          this.prey = pointer.y;
          this.hasSwitch = false;
          this.gemOverlap = this.physics.add.overlap(gameObject, this.gemGroup.getChildren().filter(e => e !== gameObject), (self, other) => {
            //------------------------------------------------
            // 交換音檔撥放
            const audioContext = this.sound.context;
            const sound = this.sound.add('gemSwitchSound');

            const sourceNode = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();

            // 設定音量
            gainNode.gain.value = 1;

            // 連接節點
            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // 取得音檔
            const audioBuffer = sound.audioBuffer;

            // 設定音源
            sourceNode.buffer = audioBuffer;

            // 撥放前 2 秒
            //sourceNode.start(0, 3, 1);  // 開始播放，延遲 0 秒，從第3秒開始，持續時間為 2 秒
            //------------------------------------------------

            this.hasSwitch = true;
            const swapGem = this.gameArray[other.i][other.j].gemSprite;
            const swapGemColor = this.gameArray[other.i][other.j].gemColor;

            const selfGem = this.gameArray[self.i][self.j].gemSprite;
            const selfGemColor = this.gameArray[self.i][self.j].gemColor;

            const [toX, toY] = [
              this.gameArray[self.i][self.j].x,
              this.gameArray[self.i][self.j].y
            ];
            //START寶石交換動畫START
            other.body.enable = false;
            this.tweens.add({
              targets: other,
              x: toX,  // 目標 x 座標
              y: toY,  // 目標 y 座標
              duration: 200,  // 持續時間（毫秒）
              ease: 'quad.out',  // 使用的緩動函數（例如 'Linear'、'Cubic' 等）
              callbackScope: this,
              onComplete: function () {
                other.body.enable = true;
              }
            });
            //END寶石交換動畫END

            this.gameArray[self.i][self.j].gemSprite = swapGem;
            this.gameArray[self.i][self.j].gemColor = swapGemColor;

            this.gameArray[other.i][other.j].gemSprite = selfGem;
            this.gameArray[other.i][other.j].gemColor = selfGemColor;

            [self.i, other.i] = [other.i, self.i];
            [self.j, other.j] = [other.j, self.j];
          }, null, this);
        }
      }
    }, this);
    this.input.on('pointermove', (pointer) => {
      if (this.dragGem) {
        //移動寶石
        const translatex = pointer.x - this.prex;
        const translatey = pointer.y - this.prey;
        this.prex = pointer.x;
        this.prey = pointer.y;
        this.dragGem.setPosition(this.dragGem.x + translatex, this.dragGem.y + translatey);

      }
    });
    this.input.on('pointerup', (pointer) => {
      if (this.dragGem) {
        this.dragGem.setDepth(1);
        this.dragGem.setPosition(
          this.gameArray[this.dragGem.i][this.dragGem.j].x,
          this.gameArray[this.dragGem.i][this.dragGem.j].y
        );
        this.dragGem = null;
        this.gemOverlap.destroy();
        // console.log('放開');
        if (this.hasSwitch) {
          //有交換再啟動消珠流程
          this.canDrag = false;
          let gameBoard = this.gameArray.map(row => row.map(col => `${col.gemColor + 1}`));

          DrawcalStore.$reset();
          DrawcalStore.gameBoard = gameBoard;
          DrawcalStore.checkGem();

          const result = DrawcalStore.roundResult;
          console.log('-----------------gameRoundCal--------------------');
          console.log(result);
          console.log('----------------------Dungeon--------------------')
          console.log(DungeonStore.finalDmg);
          console.log(DungeonStore.finalDmg[3][0]);
          this.iterator = result.entries();
          this.nextTurn();
          this.hasSwitch = false;
        }
      }
    });
    this.initGameArea();
    this.scene.run('Secondary');//上方場景
    this.secScene = this.scene.get('Secondary');

  }
  isGem(object) {
    return this.gemGroup.contains(object);
  }
  initGameArea() {
    this.gameArray = [];//用來記錄盤面的x/y座標、是否為空(有無寶石)，以及存放寶石物件、顏色
    this.poolArray = [];//放被削除的寶石
    this.gemGroup = this.add.group();//創建寶石群組
    this.dragGem = null;
    //盤格設定
    this.cellSetting = {
      size: this.game.config.width / gameOptions.colSize,
      lightColor: 0x985F2A,
      darkColor: 0x43341B,
    };
    this.boardGroup = this.add.group();  // 創建盤格群組

    //寶石相關設定
    this.gameArray = [];
    this.poolArray = [];//放被削除的寶石
    this.gemGroup = this.add.group();//創建寶石群組

    //盤格及寶石繪製
    for (let i = 0; i < gameOptions.rowSize; i++) {
      this.gameArray[i] = [];
      for (let j = 0; j < gameOptions.colSize; j++) {
        this.drawField(i, j);//繪製棋盤格
        this.createGems(i, j);//繪製寶石
      }
    }


    this.boardGroup.setY(this.game.config.height - gameOptions.rowSize * this.cellSetting.size);//將盤格群組偏移至底部

  }
  drawField(i, j) {
    const color = (i + j) % 2 === 0 ? this.cellSetting.darkColor : this.cellSetting.lightColor;
    const cell = this.add.graphics();
    cell.fillStyle(color, 1)
      .fillRect(j * this.cellSetting.size, i * this.cellSetting.size, this.cellSetting.size, this.cellSetting.size);
    this.boardGroup.add(cell);  // 將盤格添加到群組中
  }
  createGems(i, j) {
    const [x, y] = [
      j * this.cellSetting.size + this.cellSetting.size / 2,
      i * this.cellSetting.size + this.cellSetting.size / 2 + this.game.config.height - gameOptions.rowSize * this.cellSetting.size
    ];
    const gem = this.add.sprite(x, y, "gems");
    gem.setScale(0.6);//調整寶石大小
    gem.setDepth(1);
    this.physics.add.existing(gem);//加入物理世界
    gem.body.setSize(46, 46);//縮小物理碰撞範圍

    this.gemGroup.add(gem);//將寶石添加到群組
    [gem.i, gem.j] = [i, j];
    //製作寶石顏色
    do {
      let randomColor = Phaser.Math.Between(0, gameOptions.gemColors - 1);
      gem.setFrame(randomColor);
      gem.color = randomColor;
      this.gameArray[i][j] = {
        gemColor: randomColor,
        gemSprite: gem,
        isEmpty: false,
        x,
        y
      }
    } while (this.isMatch(i, j));


    gem.setInteractive();//將此遊戲物件傳遞給輸入管理器以啟用它的輸入。        
    gem.input.hitArea.setTo(65 / 2, 65 / 2, 40, 40);// 设置输入事件的範圍



  }

  isMatch(row, col) {
    return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
  }
  isHorizontalMatch(row, col) {
    return this.gemAt(row, col).gemColor == this.gemAt(row, col - 1).gemColor && this.gemAt(row, col).gemColor == this.gemAt(row, col - 2).gemColor;
  }
  isVerticalMatch(row, col) {
    return this.gemAt(row, col).gemColor == this.gemAt(row - 1, col).gemColor && this.gemAt(row, col).gemColor == this.gemAt(row - 2, col).gemColor;
  }
  gemAt(row, col) {
    if (row < 0 || row >= gameOptions.rowSize || col < 0 || col >= gameOptions.colSize) {
      return -1;
    }
    return this.gameArray[row][col];
  }
  nextTurn() {
    function parts(value, numParts) {
      const quotient = Math.floor(value / numParts);
      const remainder = value % numParts;
      return Array.from({ length: numParts }, (_, i) => quotient + (i < remainder ? 1 : 0)).reverse();
    }
    const nextEntry = this.iterator.next();
    if (!nextEntry.done) {
      //要消的總數
      this.destroyAmount = nextEntry.value[1][1].size

      //要補的顏色
      this.gemsColor = nextEntry.value[1][3].map(item => item.length != 0 ? [...item] : undefined).filter(item => item != undefined).flat().map(item => parseInt(item, 10) - 1);

      this.lastPromise = Promise.resolve();
      //紅珠
      console.log(nextEntry.value[1][5][2]);
      let values = parts(nextEntry.value[1][5][2], nextEntry.value[1][5][1].size);
      console.log(values);
      Array.from(nextEntry.value[1][5][1]).forEach((group, index) => {
        console.log('*******************************');
        console.log(values[index]);
        console.log('*******************************');
        const destroyGems = group.map(item => ({ i: item[0], j: item[1] }));
        this.destroyGems(destroyGems, '1', values[index]);
      }
      );
      //藍珠
      values = parts(nextEntry.value[1][6][2], nextEntry.value[1][6][1].size);
      Array.from(nextEntry.value[1][6][1]).forEach((group, index) => {
        console.log(values[index]);
        const destroyGems = group.map(item => ({ i: item[0], j: item[1] }));
        this.destroyGems(destroyGems, '2', values[index]);
      });
      //綠珠
      values = parts(nextEntry.value[1][7][2], nextEntry.value[1][7][1].size);
      Array.from(nextEntry.value[1][7][1]).forEach((group, index) => {
        console.log(values[index]);
        const destroyGems = group.map(item => ({ i: item[0], j: item[1] }));
        this.destroyGems(destroyGems, '3', values[index]);
      });
      //心珠
      values = parts(nextEntry.value[1][8][2], nextEntry.value[1][8][1].size);
      Array.from(nextEntry.value[1][8][1]).forEach((group, index) => {
        const gems = group.map(item => ({ i: item[0], j: item[1] }));
        this.destroyGems(gems, '4', values[index]);
      });
    }
    else {
      this.canDrag = true;
      console.log(DungeonStore.finalDmg[3][0])
      this.secScene.playerCure(DungeonStore.finalDmg[3][0]);
      this.secScene.heroAttack(DungeonStore.finalDmg);      
    }
  }

  destroyGems(gems, color, value) {
    const gemsCount = gems.length;
    const currentPromise = this.lastPromise.then(async () => {
      await new Promise(resolve => {
        //屬性動畫
        console.log(this.gameArray[gems[0].i][gems[0].j]);
        const [x, y] = [
          this.gameArray[gems[0].i][gems[0].j].x,
          this.gameArray[gems[0].i][gems[0].j].y
        ]
        this.secScene.accumulationAnimate(x, y, value, color);
        gems.forEach((gem, index) => {
          //消除的動畫
          const gemSprite = this.gameArray[gem.i][gem.j].gemSprite;
          this.tweens.add({
            targets: gemSprite,
            alpha: 0.5,
            duration: 800,
            ease: 'quad.out',
            callbackScope: this,
            onComplete: () => {
              gemSprite.setVisible(false);
              gemSprite.body.enable = false;

              // 设置颜色
              gemSprite.color = this.gemsColor.shift();
              gemSprite.setFrame(gemSprite.color);
              this.poolArray.push(gemSprite);

              if (index === gemsCount - 1) {
                resolve('換下一組');
              }
              this.destroyAmount--;
              if (this.destroyAmount == 0) {
                this.makeGemsFall();
              }
            },
          });
          this.gameArray[gem.i][gem.j].isEmpty = true;
        });
      });

    });
    this.lastPromise = currentPromise; // 更新 lastPromise，表示当前调用已经开始执行
  }

  makeGemsFall() {
    let k = 0;
    let emptyCount = 0;
    for (let j = 0; j < gameOptions.colSize; j++) {
      emptyCount = 0;
      for (let i = gameOptions.rowSize - 1; i >= 0; i--) {
        if (this.gameArray[i][j].isEmpty) {
          emptyCount++;
        }
        else if (emptyCount > 0) {
          k++;
          this.tweens.add({
            targets: this.gameArray[i][j].gemSprite,
            y: this.gameArray[i][j].y + (this.cellSetting.size * emptyCount),  // 目標 y 座標
            duration: 1000,  // 持續時間（毫秒）
            ease: 'quad.out',  // 使用的緩動函數（例如 'Linear'、'Cubic' 等）
            callbackScope: this,
            onComplete: () => {
              k--;
              if (k === 0) {
                this.fillGem();
              }
            }
          }, this);
          this.gameArray[i + emptyCount][j].gemSprite = this.gameArray[i][j].gemSprite;
          this.gameArray[i + emptyCount][j].gemSprite.i = i + emptyCount;
          this.gameArray[i + emptyCount][j].gemColor = this.gameArray[i][j].gemColor;
          this.gameArray[i][j].isEmpty = true;
          this.gameArray[i + emptyCount][j].isEmpty = false;
        }
      }
    }
    if (k === 0) {
      this.fillGem();
    }
  }

  fillGem() {
    const rowSize = gameOptions.rowSize;
    const colSize = gameOptions.colSize;
    let k = 0;
    for (let j = 0; j < colSize; j++) {
      let emptyCount = 0;

      for (let i = rowSize - 1; i >= 0; i--) {
        const currentGem = this.gameArray[i][j];

        if (currentGem.isEmpty) {
          emptyCount++;
          k++;
          const gemSprite = currentGem.gemSprite = this.poolArray.shift();
          currentGem.gemColor = gemSprite.color;

          gemSprite.i = i;
          gemSprite.j = j;
          gemSprite.setVisible(true);
          gemSprite.body.enable = true;
          gemSprite.alpha = 1;
          currentGem.isEmpty = false;

          gemSprite.x = currentGem.x;
          gemSprite.y = this.gameArray[0][j].y - this.cellSetting.size * emptyCount;
          // 更新 hitArea 的位置
          gemSprite.input.hitArea.setTo(65 / 2, 65 / 2, 40, 40);
          this.tweens.add({
            targets: gemSprite,
            y: currentGem.y,
            duration: 1000,
            ease: 'quad.out',
            callbackScope: this,
            onComplete: () => {
              k--;
              if (k === 0) this.nextTurn();
            }
          });
        }
      }
    }
  }

}
