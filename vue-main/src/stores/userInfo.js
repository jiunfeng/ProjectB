import { defineStore } from 'pinia';
import { ref } from 'vue';


/**
 * 私有命名約定加上'_',作為內部方法使用或內部變數,外部引入這隻js不要隨意呼叫帶有'_'開頭的任何方法或變數會爆炸
*/

export const useUserInfoStore = defineStore('info', {
    state: () => ({
        currentPage: "main",
        useraccount: "taiwanno1",
    }),
    actions: {}
})