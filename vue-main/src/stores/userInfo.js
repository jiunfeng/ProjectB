import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 私有命名約定加上'_',作為內部方法使用或內部變數,外部引入這隻js不要隨意呼叫帶有'_'開頭的任何方法或變數會爆炸
 */

export const useUserInfoStore = defineStore('info', {
    state: () => ({
        useraccount: '',
        userpassword: '',
        username: '',
        userrank: '',
        usermoney: '',
        usercredit: '',
        userexp: '', //根據總經驗換算rank
        userpetset: new Map(), ////寵物編號,屬性,等級,血量,攻擊力
        useritems: [], //使用者道具箱，目前暫時只有經驗果實
        userpets: [], //使用者擁有的寵物
        currentPage: 'into', //使用者目前頁面
        message: ''
    }),
    actions: {
        _setTestAccount() {
            this.useraccount = 'test001'
            this.userpassword = '1qaz2wsx'
            this.username = '測試一號'
            this.userrank = '20'
            this.usermoney = '99999'
            this.usercredit = '88888'
            this.userexp = '100000'
            // this.userpetset.set(1, {
            //     id: '001',
            //     attribute: '1',
            //     level: 5,
            //     health: 100,
            //     attack: 500,
            //     cover: 100
            // })
            // this.userpetset.set(2, {
            //     id: '002',
            //     attribute: '1',
            //     level: 5,
            //     health: 100,
            //     attack: 300,
            //     cover: 100
            // })
            // this.userpetset.set(3, {
            //     id: '003',
            //     attribute: '2',
            //     level: 5,
            //     health: 100,
            //     attack: 100,
            //     cover: 100
            // })
            this.useritems = ['001', '30']
            // this.userpets = [
            //     [
            //         1,
            //         {
            //             id: '001',
            //             attribute: '1',
            //             level: 5,
            //             health: 100,
            //             attack: 500,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         2,
            //         {
            //             id: '002',
            //             attribute: '1',
            //             level: 5,
            //             health: 100,
            //             attack: 300,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         3,
            //         {
            //             id: '003',
            //             attribute: '2',
            //             level: 5,
            //             health: 100,
            //             attack: 100,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         4,
            //         {
            //             id: '004',
            //             attribute: '2',
            //             level: 5,
            //             health: 100,
            //             attack: 300,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         5,
            //         {
            //             id: '005',
            //             attribute: '3',
            //             level: 5,
            //             health: 100,
            //             attack: 300,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         6,
            //         {
            //             id: '006',
            //             attribute: '3',
            //             level: 5,
            //             health: 100,
            //             attack: 300,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         7,
            //         {
            //             id: '007',
            //             attribute: '1',
            //             level: 5,
            //             health: 100,
            //             attack: 100,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         8,
            //         {
            //             id: '008',
            //             attribute: '2',
            //             level: 5,
            //             health: 100,
            //             attack: 300,
            //             cover: 100
            //         }
            //     ],
            //     [
            //         9,
            //         {
            //             id: '009',
            //             attribute: '3',
            //             level: 5,
            //             health: 100,
            //             attack: 100,
            //             cover: 100
            //         }
            //     ]
            // ]
        },
        async login(account, password) {
            // this.$reset()
            const reqData = {
                account: account,
                password: password
            }
            try {
                const res = await axios.post(import.meta.env.VITE_APP_API + '/userLogin', reqData)
                // console.log(res.data);
                this.message = res.data.message
                if (reqData.account.length > 0) {
                    this.useraccount = res.data.account
                    this.userpassword = res.data.password
                    this.username = res.data.username
                    this.userrank = [Math.floor(res.data.experience / 100), res.data.experience % 100]
                    this.userexp = res.data.experience
                    this.usermoney = res.data.money
                    this.usercredit = res.data.credit
                    this.userpets = res.data.userpets
                    // 處理寵物編隊
                    const petNumbers = res.data.pet_team.split('|');
                    let index = 0
                    for (const number of petNumbers) {
                        index++
                        this.userpetset.set(index, { ...this.userpets[number], 'id': number })



                    }
                    console.log(this.userpetset);
                    this.useritems = res.data.items;
                    // this.userpetset = res.data.userpets
                    // this.userpetset.set(1, {
                    //     id: '001',
                    //     attribute: '1',
                    //     level: 5,
                    //     health: 100,
                    //     attack: 500,
                    //     cover: 100
                    // })
                    // this.userpetset.set(2, {
                    //     id: '002',
                    //     attribute: '1',
                    //     level: 5,
                    //     health: 100,
                    //     attack: 300,
                    //     cover: 100
                    // })
                    // this.userpetset.set(3, {
                    //     id: '003',
                    //     attribute: '2',
                    //     level: 5,
                    //     health: 100,
                    //     attack: 100,
                    //     cover: 100
                    // })
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }


        },
        async register(account, password, username) {

            const reqData = {
                account: account,
                password: password,
                username: username
            }
            console.log(reqData + "要傳送的資料");
            try {
                const res = await axios.post(import.meta.env.VITE_APP_API + '/userCreate', reqData)

                this.message = res.data.message
                console.log(this.message);
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },

        //關卡通關
        async successDungeon(dungeonNum) {
            let addexp = 0
            let additems = []
            if (dungeonNum == "1-1") {
                addexp = 340
                additems = ["001", 5]
            }
            console.log(addexp);
            let nowexp = parseInt(this.userexp)
            console.log(this.userexp);
            this.userexp = parseInt(addexp) + nowexp
            this.userrank = [Math.floor(this.userexp / 100), this.userexp % 100]
            console.log(this.userexp);

            let items = {}
            this.useritems.split("|").forEach(pair => {
                let [key, value] = pair.split(',');
                items[key] = parseInt(value)
            });
            items[additems[0]] += additems[1]
            let itemsStr = Object.entries(items).map(([key, value]) => key + ',' + value).join("|")
            this.useritems = itemsStr


            const reqData = {
                account: this.useraccount,
                experience: this.userexp,
                items: this.useritems
            }
            try {
                const res = await axios.post(import.meta.env.VITE_APP_API + '/userUpdate', reqData)
            } catch (error) {
                console.error('Error update addexp', error)
            }
        },

        //寵物升級
        async petLevelUp(petnumber, itemnumber, itemamount) {
            const reqData = {
                account: this.useraccount,
                petnumber: petnumber,
                itemnumber: itemnumber,
                itemamount: itemamount
            }
            try {
                const res = await axios.post(import.meta.env.VITE_APP_API + '/petUpdate', reqData)
                if (res.data.message == '寵物經驗更新完成') {
                    //更新用戶端道具資料
                    this.useritems = res.data.iterms

                    //更新用戶端寵物資料
                    this.userpets[petnumber].level = [Math.floor(res.data.exp / 100), res.data.exp % 100]

                }
            } catch (error) {
                console.error('Error update addexp', error)
            }
        }
    }
})
