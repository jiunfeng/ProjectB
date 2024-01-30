<template>
    <body></body>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useDrawcalStore } from "@/stores/gameRoundCal";
import Phaser from 'vue-phaser';
// const DrawcalStore = useDrawcalStore();

// DrawcalStore.checkGem();


let game;
let gameOptions = {
    rowSize: 5,
    colSize: 6,
    gemColors: 3,
    gemSize: 100,
}
window.onload = function () {
    let gameConfig = {
        type: Phaser.AUTO,
        width: 414,
        height: 736,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true,
            }
        },
        scene: playGame,
    }
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        console.log("test Result");
        console.log(DrawcalStore.roundResult);
        this.load.spritesheet("gems", "src/game/assets/sprites/gems.png", {
            frameWidth: gameOptions.gemSize,
            frameHeight: gameOptions.gemSize
        });
        this.load.audio('gemSwitchSound', 'src/game/assets/audio/test.mp3');
    }

    create() {
        this.input.mouse.disableContextMenu();
        // 获取游戏画布的 DOM 元素
        const canvasElement = this.game.canvas;

        // 添加 mouseleave 事件监听器
        canvasElement.addEventListener('mouseleave', function (event) {
            console.log('鼠标离开游戏画布！');
            this.input.emit('pointerup');
        }.bind(this));


        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (pointer.leftButtonDown()) {
                //this.isGem()判斷點擊的物件是不是寶石
                if (this.isGem(gameObject)) {
                    gameObject.setDepth(2);
                    this.dragGem = gameObject;
                    this.prex = pointer.x;
                    this.prey = pointer.y;
                    this.hasSwitch = false;
                    this.gemCollider = this.physics.add.collider(gameObject, this.gemGroup.getChildren().filter(e => e !== gameObject), (self, other) => {
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
                        sourceNode.start(0, 3, 1);  // 開始播放，延遲 0 秒，從第3秒開始，持續時間為 2 秒
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
                this.gemCollider.destroy();
                console.log('放開');
                if (this.hasSwitch) {
                    //有交換再啟動消除
                    this.destroyGems([{ i: 3, j: 0 }, { i: 3, j: 1 }, { i: 3, j: 2 }, { i: 4, j: 3 }, { i: 3, j: 3 }, { i: 2, j: 3 }]);
                    this.hasSwitch = false;
                }
            }
        });

        this.initGameArea();
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

        this.boardGroup.setY(this.game.config.height - gameOptions.rowSize * this.cellSetting.size);//將盤格群組偏移至底
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
        gem.setScale(0.73);//調整寶石大小
        gem.setDepth(1);
        this.physics.add.existing(gem);//加入物理世界
        gem.body.setSize(46, 46);//縮小物理碰撞範圍

        this.gemGroup.add(gem);//將寶石添加到群組
        [gem.i, gem.j] = [i, j];
        //製作寶石顏色
        do {
            let randomColor = Phaser.Math.Between(0, gameOptions.gemColors - 1);
            gem.setFrame(randomColor);
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

    destroyGems(gems) {
        let k = 1;
        gems.forEach(gem => {
            this.tweens.add({
                targets: this.gameArray[gem.i][gem.j].gemSprite,
                alpha: 0.5,
                duration: 300,
                ease: 'quad.out',
                callbackScope: this,
                onComplete: function () {
                    this.gameArray[gem.i][gem.j].gemSprite.setVisible(false);
                    this.gameArray[gem.i][gem.j].gemSprite.body.enable = false;
                    this.poolArray.push(this.gameArray[gem.i][gem.j].gemSprite);
                    if (k == gems.length) {
                        this.makeGemsFall();
                        this.fillGem();
                    }
                    else k++;
                }
            }, this);
            this.gameArray[gem.i][gem.j].isEmpty = true;
        });

    }
    makeGemsFall() {
        for (let j = 0; j < gameOptions.colSize; j++) {
            let emptyCount = 0;
            for (let i = gameOptions.rowSize - 1; i >= 0; i--) {
                if (this.gameArray[i][j].isEmpty) {
                    emptyCount++;
                }
                else if (emptyCount > 0) {
                    this.tweens.add({
                        targets: this.gameArray[i][j].gemSprite,
                        y: this.gameArray[i][j].y + (this.cellSetting.size * emptyCount),  // 目標 y 座標
                        duration: 200,  // 持續時間（毫秒）
                        ease: 'quad.out',  // 使用的緩動函數（例如 'Linear'、'Cubic' 等）
                        callbackScope: this,
                    }, this);
                    this.gameArray[i + emptyCount][j].gemSprite = this.gameArray[i][j].gemSprite;
                    this.gameArray[i + emptyCount][j].gemSprite.i = i + emptyCount;
                    console.log(this.gameArray[i + emptyCount][j].gemSprite.i);
                    this.gameArray[i][j].isEmpty = true;
                    this.gameArray[i + emptyCount][j].isEmpty = false;
                }
            }
        }
    }
    fillGem() {
        for (let j = 0; j < gameOptions.colSize; j++) {
            let emptyCount = 0;
            for (let i = gameOptions.rowSize - 1; i >= 0; i--) {
                if (this.gameArray[i][j].isEmpty) {
                    emptyCount++;
                    this.gameArray[i][j].gemSprite = this.poolArray.shift();
                    this.gameArray[i][j].gemSprite.i = i;
                    this.gameArray[i][j].gemSprite.setVisible(true);
                    this.gameArray[i][j].gemSprite.body.enable = true;
                    this.gameArray[i][j].gemSprite.alpha = 1;
                    this.gameArray[i][j].isEmpty = false;

                    this.gameArray[i][j].gemSprite.x = this.gameArray[i][j].x;
                    this.gameArray[i][j].gemSprite.y = this.gameArray[0][j].y - this.cellSetting.size * emptyCount;

                    this.tweens.add({
                        targets: this.gameArray[i][j].gemSprite,
                        y: this.gameArray[i][j].y,  // 目標 y 座標
                        duration: 200,  // 持續時間（毫秒）
                        ease: 'quad.out',  // 使用的緩動函數（例如 'Linear'、'Cubic' 等）
                        callbackScope: this,
                    });
                }
            }
        }
    }
}
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}


</script>
<style scoped>
body {
    background: #0aa7c3;
    padding: 0px;
    margin: 0px;
}

canvas {
    display: block;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>