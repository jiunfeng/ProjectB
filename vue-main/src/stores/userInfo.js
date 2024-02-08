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
        userpetset: [],//寵物使用隊伍 編號+經驗
        useritems: [],//使用者道具箱，目前暫時只有經驗果實
        userpets: [],//使用者擁有的寵物
        currentPage: "main",//使用者目前頁面
    }),
    actions: {
        _setTestAccount() {
            this.useraccount = "test01",
                this.userpassword = "1qaz2wsx",
                this.username = "測試一號機",
                this.userrank = "20",
                this.usermoney = "99999",
                this.usercredit = "88888",
                this.userexp = "100000",
                this.userpetset = [["001", "20000"], ["002", "30000"], ["003", "400000"]],
                this.useritems = [["001", "30"],]
                this.userpets = []//使用者擁有的寵物
        },
    }
})