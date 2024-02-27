import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';


/**
 * 私有命名約定加上'_',作為內部方法使用或內部變數,外部引入這隻js不要隨意呼叫帶有'_'開頭的任何方法或變數會爆炸
*/

export const useUserInfoStore = defineStore('info', {
    state: () => ({
        useraccount: "",
        userpassword: "",
        username: "",
        userrank: "",
        usermoney: "",
        usercredit: "",
        userexp: "",//根據總經驗換算rank
        userpetset: new Map(),////寵物編號,屬性,等級,血量,攻擊力
        useritems: [],//使用者道具箱，目前暫時只有經驗果實
        userpets: [],//使用者擁有的寵物
        currentPage: "into",//使用者目前頁面
        message: "",
    }),
    actions: {
        _setTestAccount() {
            this.useraccount = "test001";
            this.userpassword = "1qaz2wsx";
            this.username = "測試一號";
            this.userrank = "20";
            this.usermoney = "99999";
            this.usercredit = "88888";
            this.userexp = "100000";
            this.userpetset.set(1, {
                id: "001",
                attribute: "1",
                level: 5,
                health: 100,
                attack: 500,
                cover: 100
            });
            this.userpetset.set(2, {
                id: "002",
                attribute: "1",
                level: 5,
                health: 100,
                attack: 300,
                cover: 100
            });
            this.userpetset.set(3, {
                id: "003",
                attribute: "2",
                level: 5,
                health: 100,
                attack: 100,
                cover: 100
            });
            this.userpetset.set(4, {
                id: "004",
                attribute: "2",
                level: 5,
                health: 100,
                attack: 300,
                cover: 100
            });
            this.userpetset.set(5, {
                id: "005",
                attribute: "3",
                level: 5,
                health: 100,
                attack: 100,
                cover: 100
            });
            this.userpetset.set(6, {
                id: "006",
                attribute: "3",
                level: 5,
                health: 100,
                attack: 300,
                cover: 100
            });
            this.userpetset.set(7, {
                id: "007",
                attribute: "1",
                level: 5,
                health: 100,
                attack: 100,
                cover: 100
            });
            this.userpetset.set(8, {
                id: "008",
                attribute: "2",
                level: 5,
                health: 100,
                attack: 300,
                cover: 100
            });
            this.userpetset.set(9, {
                id: "009",
                attribute: "3",
                level: 5,
                health: 100,
                attack: 100,
                cover: 100
            });
            this.useritems = ["001", "30"];
            this.userpets = []//使用者擁有的寵物
        },
        async login(account, password) {
            this.$reset()
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
                    this.usermoney = res.data.money
                    this.usercredit = res.data.credit
                    this.userpetset = res.data.pet_team
                    this.useritems = res.data.items

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
})