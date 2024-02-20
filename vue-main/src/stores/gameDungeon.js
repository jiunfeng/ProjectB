import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep';
import clearUniq from "lodash/uniq";
import { useDrawcalStore } from "@/stores/gameRoundCal"
import { useUserInfoStore } from '@/stores/userInfo';
export const useDungeonStore = defineStore('Dungeon', {
    state: () => ({
        //由userinfo抓取
        redAttack: 0,
        blueAttack: 0,
        greenAttack: 0,
        coverAttack: 0,
        leaderPower: [1, 2.5],//隊長倍率[屬性,倍率]
        enemyInfo: [],//關卡資料 怪物編號,屬性,血量,攻擊力,攻擊回合


        //每次給予盤面要重置
        totalCombo: 0,
        redTotalDmg: 0,
        blueTotalDmg: 0,
        greenTotalDmg: 0,
        coverTotalDmg: 0,
        redAll: 0,//全體攻擊開關 條件為 任意一次消除6顆珠子以上  0=單體攻擊 1全體攻擊
        blueAll: 0,
        greenAll: 0,
        finalDmg: [],//最終結果 [傷害,是否全體],陣列最後是心珠恢復用
        turnRedGem: [],
        turnBlueGem: [],
        turnGreenGem: [],
        turnCoverGem: [],
    }),
    actions: {
        entryDungeon(dungeonNum) {
            //[圖_0,屬性_1,HP_2,攻擊力_3,CD_4]
            if (dungeonNum == "1-1") {
                this.enemyInfo = [
                    [["001", "1", "2000", "50", 3]/*, ["002", "2", "3000", "20", 2], ["002", "2", "300", "20", 2]*/],
                    // [["002", "2", "3000", "20", 2], ["003", "3", "1000", "50", 5]],
                    // [["004", "1", "2000", "30", 3]]
                ]
                //暫時填充 圖 

                this._resetTurn()
                this._getAttack()

            }

        },
        _resetTurn() {//每rounnd計算後重置
            this.redAll = 0
            this.blueAll = 0
            this.greenAll = 0
            this.finalDmg = 0
            this.turnRedGem = 0
            this.turnBlueGem = 0
            this.turnGreenGem = 0
            this.turnCoverGem = 0
        },
        _getAttack() {//取得寵物攻擊力恢復力
            const userinfo = useUserInfoStore()
            userinfo.userpetset.forEach((pet, key) => {
                if (pet.attribute == 1) {
                    this.redAttack += pet.attack

                }
                if (pet.attribute == 2) {
                    this.blueAttack += pet.attack
                }
                if (pet.attribute == 3) {
                    this.greenAttack += pet.attack
                }

                this.coverAttack += pet.cover

            })
        },
        // 接受 turn?參數作為key計算turn每色珠傷害
        _turnAttackCal(turn) {
            const drawcal = useDrawcalStore()


            for (let index = 5; index < 9; index++) {
                let gemInfo = drawcal.roundResult.get(turn)[index]
                let colorPower = 0//色倍率
                if (gemInfo[1].size !== 0) {//處理各色非０combo計算
                    gemInfo[1].forEach(gemArray => {

                        //檢查是否全體攻擊
                        if (gemInfo[0] == 1) {
                            if (gemArray.length >= 6) {
                                this.redAll = 1
                            }

                        }
                        if (gemInfo[0] == 2) {
                            if (gemArray.length >= 6) {
                                this.blueAll = 1
                            }

                        }
                        if (gemInfo[0] == 3) {
                            if (gemArray.length >= 6) {
                                this.greemAll = 1
                            }

                        }
                        colorPower += gemArray.length * 0.25

                        this.totalCombo += colorPower
                    });

                    if (gemInfo[0] == 1) {

                        gemInfo.push(this.redAttack * colorPower)
                        this.redTotalDmg += this.redAttack * colorPower

                    }
                    if (gemInfo[0] == 2) {

                        gemInfo.push(this.blueAttack * colorPower)
                        this.blueTotalDmg += this.blueAttack * colorPower
                    }
                    if (gemInfo[0] == 3) {

                        gemInfo.push(this.greenAttack * colorPower)
                        this.greenTotalDmg += this.greenAttack * colorPower
                    }
                    if (gemInfo[0] == 4) {
                        gemInfo.push(this.coverAttack * colorPower)
                        this.coverTotalDmg += this.coverAttack * colorPower
                    }
                } else {
                    gemInfo.push("沒有")
                }


            }
        },

        //最終傷害計算
        _finalAttack() {

            let red = this.redTotalDmg * this.totalCombo * 0.25
            let blue = this.blueTotalDmg * this.totalCombo * 0.25
            let green = this.greenTotalDmg * this.totalCombo * 0.25
            let cover = this.coverTotalDmg * this.totalCombo * 0.25
            if (this.leaderPower[0] == 1) {
                red *= this.leaderPower[1]
            }
            if (this.leaderPower[0] == 2) {
                blue *= this.leaderPower[1]
            }
            if (this.leaderPower[0] == 3) {
                green *= this.leaderPower[1]
            }
            this.finalDmg = [[Math.trunc(red * this.totalCombo * 0.25), this.redAll], [Math.trunc(blue * this.totalCombo * 0.25), this.blueAll], [Math.trunc(green * this.totalCombo * 0.25), this.greenAll], [Math.trunc(cover * this.totalCombo * 0.25), 1]]
            console.log('***************************');
            console.log(this.finalDmg);
        }

    }
})