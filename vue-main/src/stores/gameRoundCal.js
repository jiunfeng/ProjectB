import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep';
import clearUniq from "lodash/uniq";

/**
 * 私有命名約定加上'_',作為內部方法使用,外部引入這隻js不要隨意呼叫帶有'_'開頭的任何方法或變數會爆炸
 * round表示每次提交盤面,turn表示每round內處理過幾回合落珠
*/

export const useDrawcalStore = defineStore('counter', {
    state: () => ({
        // gameBoard: [['1', '3', '3', '1', '1', '1'],
        // ['3', '2', '3', '1', '1', '2'],
        // ['2', '4', '1', '1', '2', '1'],
        // ['1', '2', '3', '1', '3', '1'],
        // ['2', '4', '1', '3', '1', '2']],
        gameBoard: [['1', '1', '1', '1', '1', '4'],
        ['3', '2', '3', '2', '1', '2'],
        ['1', '4', '3', '1', '2', '1'],
        ['1', '4', '3', '1', '2', '1'],
        ['1', '4', '3', '1', '2', '2']],
        gameBoardDraw: [],//處理完掉落盤面
        gameGemRemovedSet: new Set(),
        ColorGemList: [],
        _roundRedSet: new Set(),
        _roundBlueSet: new Set(),
        _roundGreenSet: new Set(),
        _roundCoverSet: new Set(),
        _checkColSameState: false,
        _checkRowSameState: false,
        turnRedComboSet: new Set(),
        turnBlueComboSet: new Set(),
        turnGreenComboSet: new Set(),
        turnCoverComboSet: new Set(),
        roundCountGemRed: 0,
        roundCountGemBlue: 0,
        roundCountGemGreen: 0,
        roundCountGemCover: 0,
        roundRedUnitSum: 0,
        roundRedComboSum: 0,
        roundBlueUnitSum: 0,
        roundBlueComboSum: 0,
        roundGreenUnitSum: 0,
        roundGreenComboSum: 0,
        roundCoverUnitSum: 0,
        roundCoverComboSum: 0,
        roundTotalCombo: 0,
        turnOfRound: 1,//一共經歷過幾turn必定最少會1表示送入盤面處理該turn
        turnDrawColorOfCol: [[], [], [], [], [], []],//每col要掉落珠的顏色依照順序
        roundResult: new Map(),//turn01>數字遞增表示一共有幾次落珠 [[最終盤面],[gem原始位置,gem移動位置],[每col掉落珠色,長度六沒有會塞空陣列],目前turn總combo]
        turnGemMoveArray: [],//每turn珠要從哪裡掉落到哪裡
        visitedArray: [
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ],
    }),
    actions: {
        checkGem() {
            for (let i = 0; i < this.gameBoard.length; i++) {
                for (let j = 0; j < this.gameBoard[0].length; j++) {

                    // checkAndRemoveDuplicates(i, j, 0, 1)
                    /*
                    這邊要寫的邏輯是
                    呼叫一個函數 handleAdjacency然後給入 每個GEM的位置
                     */
                    if (this.gameBoard[i][j] != null) {
                        console.log("目前要檢查的珠子為" + i + j);

                        this._findSameGemInCol(i, j, this.gameBoard[i][j])
                        this._findSameGemInRow(i, j, this.gameBoard[i][j])
                    }
                }
            }

            this.turnRedComboSet = this._checkGemSetCombo(this._roundRedSet)
            this.turnBlueComboSet = this._checkGemSetCombo(this._roundBlueSet)
            this.turnGreenComboSet = this._checkGemSetCombo(this._roundGreenSet)
            this.turnCoverComboSet = this._checkGemSetCombo(this._roundCoverSet)

            this._moveAndDrawGem()//處理掉落
            this._calTurnComboAndGem()//計算回合combo珠數

            if (!this.turnDrawColorOfCol.every(subArray => subArray.length === 0)) {

                this.roundResult.set('turn' + this.turnOfRound, [cloneDeep(this.gameBoard), cloneDeep(this.gameGemRemovedSet), cloneDeep(this.turnGemMoveArray), cloneDeep(this.turnDrawColorOfCol), this.roundTotalCombo])
            }
            if (this._checkRowSameState === true || this._checkColSameState === true) {
                console.log("有進入下回合");
                this.turnOfRound++
                //初始化部分變數
                this.gameBoardDraw = []//處理完掉落盤面
                this.gameGemRemovedSet = new Set()
                this.ColorGemList = []
                this._roundRedSet = new Set()
                this._roundBlueSet = new Set()
                this._roundGreenSet = new Set()
                this._roundCoverSet = new Set()
                this._checkColSameState = false
                this._checkRowSameState = false
                this.turnRedComboSet = new Set()
                this.turnBlueComboSet = new Set()
                this.turnGreenComboSet = new Set()
                this.turnCoverComboSet = new Set()
                this.turnDrawColorOfCol = [[], [], [], [], [], []]//每col要掉落珠的顏色依照順序
                this.turnGemMoveArray = []
                this.visitedArray = [
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null],
                    [null, null, null, null, null, null]
                ]

                this.checkGem()
            }
            console.log("遍歷陣列結果null為combo");
            console.log(this.gameBoard);
            console.log("被訪問過的");
            console.log(this.visitedArray);
            console.log("單次集合");
            console.log(this.gameGemRemovedSet);
            console.log("RED集合")
            console.log(this.turnRedComboSet);
            console.log("BLUE集合")
            console.log(this.turnBlueComboSet);
            console.log("GREEN集合")
            console.log(this.turnGreenComboSet);
            console.log("COVER集合")
            console.log(this.turnCoverComboSet);
            console.log("掉落後盤面");
            console.log(this.gameBoardDraw);
            console.log("掉落陣列");
            console.log(this.turnGemMoveArray);
            console.log("各色珠子combo個數狀況");
            console.log("紅色" + "綜合:" + this.roundRedUnitSum + "combo" + this.roundRedComboSum);
            console.log("藍色" + "綜合:" + this.roundBlueUnitSum + "combo" + this.roundBlueComboSum);
            console.log("綠色" + "綜合:" + this.roundGreenUnitSum + "combo" + this.roundGreenComboSum);
            console.log("粉色" + "綜合:" + this.roundCoverUnitSum + "combo" + this.roundCoverComboSum);
            console.log("回合combo" + this.roundTotalCombo);
            console.log("每col要補的顏色");
            console.log(this.turnDrawColorOfCol[0]);
            console.log(this.turnDrawColorOfCol[1]);
            console.log(this.turnDrawColorOfCol[2]);
            console.log(this.turnDrawColorOfCol[3]);
            console.log(this.turnDrawColorOfCol[4]);
            console.log(this.turnDrawColorOfCol[5]);
            console.log("最後回傳結果");
            console.log(this.roundResult);


        },
        randomMatrix() {
            const array = generateRandomMatrix(5, 6)
            this.gameBoard = array

        },

        // 檢查左右珠子相同
        _findSameGemInCol(row, col, color) {
            let colChange = 1
            let tmpSameGemPosition = [[row, col]]
            let rightGem = true
            let leftGem = true
            while (col + colChange < this.gameBoard[0].length || col - colChange >= 0) {
                if (rightGem === true && col + colChange < this.gameBoard[0].length && this.gameBoard[row][col] === this.gameBoard[row][col + colChange]) {
                    tmpSameGemPosition.push([row, col + colChange])
                } else {
                    rightGem = false
                }
                if (leftGem === true && col - colChange >= 0 && this.gameBoard[row][col] === this.gameBoard[row][col - colChange]) {
                    tmpSameGemPosition.push([row, col - colChange])
                } else {
                    leftGem = false
                }
                colChange++
            }

            // 暫存位置大於三表示可以消除再進行遞迴檢查上下
            if (tmpSameGemPosition.length >= 3) {
                this._checkRowSameState = true//用來檢查是否要進入下一個回合
                console.log("暫存檢查到的COL陣列");
                console.log(tmpSameGemPosition);
                tmpSameGemPosition.forEach(element => {

                    if (this.visitedArray[element[0]][element[1]] != true) {
                        this.gameGemRemovedSet.add(element)
                        this.visitedArray[element[0]][element[1]] = true
                        this._findSameGemInRow(element[0], element[1], color)
                        this.gameBoard[element[0]][element[1]] = null
                    }
                });
                // 將結果存到珠子所屬顏色集合
                console.log("珠子顏色" + color);
                if (color == 1) {
                    this._roundRedSet.add(tmpSameGemPosition)
                } else if (color == 2) {
                    this._roundBlueSet.add(tmpSameGemPosition)
                } else if (color == 3) {
                    this._roundGreenSet.add(tmpSameGemPosition)
                } else if (color == 4) {
                    this._roundCoverSet.add(tmpSameGemPosition)
                }
            }



        },
        // 檢查上下珠子相同
        _findSameGemInRow(row, col, color) {
            let rowChange = 1
            let tmpSameGemPosition = [[row, col]]
            let upGem = true
            let downGem = true
            while (row + rowChange < this.gameBoard.length || row - rowChange >= 0) {
                if (downGem === true && row + rowChange < this.gameBoard.length && this.gameBoard[row][col] === this.gameBoard[row + rowChange][col]) {
                    tmpSameGemPosition.push([row + rowChange, col])
                } else {
                    downGem = false
                }
                if (upGem === true && row - rowChange >= 0 && this.gameBoard[row][col] === this.gameBoard[row - rowChange][col]) {
                    tmpSameGemPosition.push([row - rowChange, col])
                } else {
                    upGem = false
                }
                rowChange++
            }

            // 暫存位置大於三表示可以消除再進行遞迴檢查上下
            if (tmpSameGemPosition.length >= 3) {
                this._checkRowSameState = true//用來檢查是否要進入下一個回合
                console.log("暫存檢查到的ROW陣列");
                console.log(tmpSameGemPosition)
                tmpSameGemPosition.forEach(element => {

                    if (this.visitedArray[element[0]][element[1]] != true) {
                        this.gameGemRemovedSet.add(element)
                        this.visitedArray[element[0]][element[1]] = true
                        this._findSameGemInCol(element[0], element[1], color)
                        this.gameBoard[element[0]][element[1]] = null
                    }
                });
                // 將結果存到珠子所屬顏色集合
                console.log("加入集合前COLOR" + color);
                console.log("加入集合前tmp集合");
                console.log(tmpSameGemPosition);
                if (color == 1) {

                    this._roundRedSet.add(tmpSameGemPosition)
                } else if (color == 2) {

                    this._roundBlueSet.add(tmpSameGemPosition)
                } else if (color == 3) {

                    this._roundGreenSet.add(tmpSameGemPosition)
                } else if (color == 4) {

                    this._roundCoverSet.add(tmpSameGemPosition)
                }
            }



        },
        // 檢查Gem集合是否相鄰 處理combo不要重複計算 return 結果
        _checkGemSetCombo(colorGemSet) {

            console.log("-----------------\n")
            const adjacentOffsets = [
                [-1, 0], [1, 0], [0, -1], [0, 1]  // 上、下、左、右
            ];
            let finalGemSet = new Set()

            // 將集合每個combo組取出做檢查
            for (const gemComboArray of colorGemSet) {

                let gemComboArrayAddPosition = new Set(gemComboArray)//擴展被檢查combo位置用集合
                console.log("目前檢查");
                console.log(gemComboArray);
                let stepGemArray = [...gemComboArray]
                colorGemSet.delete(gemComboArray)

                //   將要作為主檢查的集合位置加入上下左右，需過濾掉超出5*6範圍
                Array.from(gemComboArray).forEach(element => {

                    for (const direct of adjacentOffsets) {

                        const newRow = element[0] + direct[0]
                        const newCol = element[1] + direct[1]
                        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 6) {

                            gemComboArrayAddPosition.add([newRow, newCol])
                        }
                    }
                });


                // 檢查主集合是否包含子集合中的任何一個元素

                for (const iterator of colorGemSet) {

                    const containsAny = iterator.some(element =>
                        Array.from(gemComboArrayAddPosition).some(setElement =>
                            JSON.stringify(element) === JSON.stringify(setElement)
                        )
                    );//true表示 兩個組合相鄰 
                    if (containsAny) {
                        console.log("主集合包含子集合中的至少一個元素");
                        colorGemSet.delete(iterator)
                        stepGemArray.push(...iterator)
                        //   將要被檢查到相鄰的集合位置加入上下左右再加入主要檢查對象，需過濾掉超出5*6範圍
                        Array.from(iterator).forEach(element => {

                            for (const direct of adjacentOffsets) {

                                const newRow = element[0] + direct[0]
                                const newCol = element[1] + direct[1]
                                if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 6) {

                                    gemComboArrayAddPosition.add([newRow, newCol])
                                }
                            }
                        });
                    }
                }
                finalGemSet.add(stepGemArray)
            }



            console.log("finalGemSet");
            console.log(finalGemSet);

            return finalGemSet

        },

        //處理消除後珠子補滿
        _moveAndDrawGem() {

            this.gameBoardDraw = cloneDeep(this.gameBoard);//深層copy成新的陣列避免影響
            console.log("被檢查掉落的矩陣");
            console.log(this.gameBoardDraw);
            for (let col = 0; col < this.gameBoardDraw[0].length; col++) {
                let drawColor = []//該col要補的gem
                for (let newRow = 4; newRow >= 0; newRow--) {
                    console.log("目前檢查的掉落位置" + newRow + col);
                    if (this.gameBoardDraw[newRow][col] === null) {
                        console.log("找到空位置," + newRow + col);

                        for (let row = newRow; row >= 0; row--) {
                            if (this.gameBoardDraw[row][col] != null) {
                                this.gameBoardDraw[newRow][col] = this.gameBoardDraw[row][col]
                                this.gameBoardDraw[row][col] = null
                                this.turnGemMoveArray.push([[row, col], [newRow, col]])
                                break
                            }

                        }
                    }

                }
                //補珠子
                for (let row = 4; row >= 0; row--) {
                    const elements = ['1', '2', '3', '4'];//1=red 2=blue 3=green 4=cover

                    if (this.gameBoardDraw[row][col] === null) {
                        const randomIndex = Math.floor(Math.random() * elements.length);
                        this.gameBoardDraw[row][col] = elements[randomIndex]
                        drawColor.push(elements[randomIndex])
                    }

                }
                this.turnDrawColorOfCol[col] = drawColor
            }
            this.gameBoard = this.gameBoardDraw


        },
        //計算每回合combo以及珠數量
        _calTurnComboAndGem() {
            for (let combo of this.turnRedComboSet) {
                let uniqueMatrix = Array.from(new Set(combo.map(JSON.stringify)), JSON.parse);

                this.roundRedUnitSum += uniqueMatrix.length
                this.roundRedComboSum++
            }
            for (let combo of this.turnBlueComboSet) {
                let uniqueMatrix = Array.from(new Set(combo.map(JSON.stringify)), JSON.parse);
                this.roundBlueUnitSum += uniqueMatrix.length
                this.roundBlueComboSum++
            }
            for (let combo of this.turnGreenComboSet) {
                let uniqueMatrix = Array.from(new Set(combo.map(JSON.stringify)), JSON.parse);
                this.roundGreenUnitSum += uniqueMatrix.length
                this.roundGreenComboSum++
            }
            for (let combo of this.turnCoverComboSet) {
                let uniqueMatrix = Array.from(new Set(combo.map(JSON.stringify)), JSON.parse);
                this.roundCoverUnitSum += uniqueMatrix.length
                this.roundCoverComboSum++
            }
            this.roundTotalCombo = this.roundRedComboSum + this.roundBlueComboSum + this.roundGreenComboSum + this.roundCoverComboSum
        },
    }
})




// 生成隨機矩陣
function generateRandomMatrix(rows, cols) {
    const elements = ['1', '2', '3', '4'];//1=red 2=blue 3=green 4=cover
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const randomIndex = Math.floor(Math.random() * elements.length);
            row.push(elements[randomIndex]);
        }
        matrix.push(row);
    }
    console.log("生成原始矩陣");
    console.log(matrix);
    return matrix.map(row => [...row]);//為了印出原始 需要拷貝 不然因為參考相同的記憶體位置 後續改變也會修改到這邊

}




