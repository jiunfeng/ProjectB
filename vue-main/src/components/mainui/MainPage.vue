<template>
    <div class="body1 mx-auto br">
        <!-- 上方 -->
        <!-- 頭貼 左上方，需資料庫資料-->
        <img class="userimg1" src="/mainui/images/index/1-1-2.png" alt="">
        <img class="userimg1-1" src="/mainui/images/role/002_small.png" alt="">
        <button type="button" class="userimg1-2" @click.self="headgin"
            :style="{ backgroundImage: 'url(sprites/herohead/' + headindex + '.png' }"></button>
        <!-- <input class="userimg1-2" type="image" src="./src/assets/mainui/images/index/1-1-3.png" alt="" name="" id=""/> -->

        <!-- 人物資訊 左上方，需資料庫資料 -->
        <div class="userdiv1 bg2 textsize1 translate-middle-x border border-2">
            <span class="text-white mx-auto">&nbsp;&nbsp;LV.<span v-text="userStore.userrank[0]"></span></span>
            <br>
            <span class="text-white mx-3" v-text="userStore.username"></span>
            <div style="height: 3px; user-select: none;"></div>
            <!-- <div class="bg-white mx-1" style="height: 2px;"></div>
            <span class="text-white mx-2">ID:</span><span class="text-white me-3" v-text="userStore.userid"></span>
            <div style="height: 3px; user-select: none;"></div> -->
        </div>
        <!-- 資源 -->
        <div class="usermoneydiv1 bg1 rounded-pill textsize2 br text-center">
            <!-- 錢 上方，需資料庫資料 -->
            <img class="usermoneyimg1" src="/mainui/images/index/money2.png">
            <span class="text-white">&nbsp;<span v-text="userStore.usermoney"></span></span>
            <!-- 經驗 上方，需資料庫資料 -->
            <img class="userexpimg1 my-2 ms-2" src="/mainui/images/index/exp2.png">
            <span class="text-white mx-1" v-text="userStore.usercredit"></span>
        </div>
        <!-- 下方 -->
        <!-- 背景角色 下方中間，需資料庫資料-->
        <img class="conimg1 translate-middle-x" :src="'/sprites/hero/' + chgindex + '.png'">
        <!-- 換角色按鈕 下方右邊-->
        <button type="submit" class="conchangimg1" @click.self="chgin"></button>
        <!-- 戰鬥按鈕 中間左邊-->
        <button type="submit" class="btnfight1" @click="changePage('game')" @mouseover="fightover"
            @mouseleave="fightleave" v-bind:style="{ backgroundImage: 'url(' + fightimg1 + ')' }"></button>
        <!-- 箱子按鈕 中間左邊-->
        <button type="submit" class="btnbox1" @click="changePage('box')" @mouseover="boxover" @mouseleave="boxleave"
            v-bind:style="{ backgroundImage: 'url(' + boximg1 + ')' }"></button>

        <!-- 換角色背景頁面 -->
        <div class="chg-mask mx-auto" :style="chgdivsty" @click.self="chglev">
            <div class="chg-container translate-middle" :style="chgdivsty1">

                <!-- 離開按鈕 -->
                <button class="chg-leavbtn border-4 translate-middle" @click.self="chglev" :style="chgdivsty2"></button>

                <div class="text-center border border-5" :style="chgdivsty2">
                    <label class=" mx-auto text-center align-content-center" for="">更換背景角色</label>
                </div>
                <div class="chgimgdiv border border-5 text-center" :style="chgdivsty2">
                    <button class="chgimg" :id=pets[0]
                        :style="{ display: test ? '' : 'none', backgroundImage: 'url(sprites/hero/' + index + '.png' }"
                        v-for="(pets, index) in userStore.userpets" @click="chgimg(index)">
                    </button>
                </div>
                <!-- 確定按鈕 -->
                <!-- <button class="chg-btn translate-middle-x" type="button" @click="chg" :style="chgdivsty2">確定</button> -->
            </div>
        </div>

        <!-- 換頭像頁面 -->
        <div class="chg-mask mx-auto" :style="headsty" @click.self="headlev">
            <div class="chg-container translate-middle" :style="headsty1">

                <!-- 離開按鈕 -->
                <button class="chg-leavbtn border-4 translate-middle" @click.self="headlev" :style="headsty2"></button>

                <div class="text-center border border-5" :style="headsty2">
                    <label class=" mx-auto text-center align-content-center" for="">更換頭像</label>
                </div>
                <div class="chgimgdiv border border-5 text-center" :style="headsty2">
                    <button class="headimg" :id=pets[0]
                        :style="{ display: test1 ? '' : 'none', backgroundImage: 'url(sprites/herohead/' + index + '.png' }"
                        v-for="(pets, index) in userStore.userpets" @click="headimg(index)">
                    </button>
                </div>
                <!-- 確定按鈕 -->
                <!-- <button class="chg-btn translate-middle-x" type="button" @click="chg" :style="chgdivsty2">確定</button> -->
            </div>
        </div>

    </div>

    <!-- 引用在public中的css -->
    <link rel="stylesheet" href="/mainui/css/index1.css">
    <link rel="stylesheet" href="/mainui/css/bootstrap.min.css">
</template>

<script setup>
// #預設
// import "@/assets/index1.css"
// 須自己打的預設
import { ref, computed } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";

// # 獲取資料庫的資訊
// 宣告userStore擁有userInfo.js的資料
const userStore = useUserInfoStore();
const changePage = (page) => {
    userStore.currentPage = page;
}
console.log("rank:" + userStore.userrank[0]);
// console.log(userStore.userpets);
// console.log(userStore.petNumbers);

// # fightimg按鈕圖片改變
const fightimg1 = ref('/mainui/images/index/fight1.png');
// 進入元素
function fightover() {
    fightimg1.value = '/mainui/images/index/fight2.png'
}
// 離開元素
function fightleave() {
    fightimg1.value = '/mainui/images/index/fight1.png'
}

// # boximg按鈕圖片改變
const boximg1 = ref('/mainui/images/index/box1.png');
// 進入元素
function boxover() {
    boximg1.value = '/mainui/images/index/box2.png'
}
// 離開元素
function boxleave() {
    boximg1.value = '/mainui/images/index/box1.png'
}

// # 換背景角色+頭像
// 跳出視窗的變化-背景角色
const test = ref(false);
const isShow = ref(false);
const chgdivsty = computed(() => {
    return { "height": isShow.value ? "100%" : "0%" };
});
const chgdivsty1 = computed(() => {
    return { "height": isShow.value ? "55%" : "0%" };
});
const chgdivsty2 = computed(() => {
    return { "display": isShow.value ? "" : "none" };
});
console.log(chgdivsty);
// 顯示角色頁面
function chgin() {
    isShow.value = true;
    test.value = !test.value;
    console.log("isShow:" + isShow.value);
    console.log(chgdivsty.value);
    console.log("test:" + test.value);
}
// 隱藏角色頁面
function chglev() {
    isShow.value = false;
    test.value = !test.value;
    console.log("isShow:" + isShow.value);
    console.log(chgdivsty.value);
    console.log("test:" + test.value);
}
// 角色圖片變換
const chgimgs = ref(userStore.usermainpet);
const chgindex = computed(() =>
    chgimgs.value
);
function chgimg(data) {
    chgimgs.value = data;
    console.log("chgindex.value:" + chgindex.value);
    isShow.value = false;
    test.value = !test.value;
    userStore.changeMainPet(chgindex.value)
}
// 跳出視窗的變化-頭像
const test1 = ref(false);
const isShow1 = ref(false);
const headsty = computed(() => {
    return { "height": isShow1.value ? "100%" : "0%" };
});
const headsty1 = computed(() => {
    return { "height": isShow1.value ? "55%" : "0%" };
});
const headsty2 = computed(() => {
    return { "display": isShow1.value ? "" : "none" };
});
console.log(headsty);
// 顯示頭像頁面
function headgin() {
    isShow1.value = true;
    test1.value = !test1.value;
    console.log("isShow1:" + isShow1.value);
    console.log(headsty.value);
    console.log("test1:" + test1.value);
}
// 隱藏頭像頁面
function headlev() {
    isShow1.value = false;
    test1.value = !test1.value;
    console.log("isShow1:" + isShow1.value);
    console.log(headsty.value);
    console.log("test1:" + test1.value);
}
// 頭像變換
const headimgs = ref(userStore.userhead);
const headindex = computed(() =>
    headimgs.value
);
function headimg(data) {
    headimgs.value = data;
    console.log("headindex.value:" + headindex.value);
    isShow1.value = false;
    test1.value = !test1.value;
    userStore.changeHead(headindex.value)
}

// import { computed } from 'vue';
// import { getCurrentInstance } from 'vue';
// const {proxy} = getCurrentInstance();


// const demo = getCurrentInstance()
// const user = demo.appContext.config.globalProperties.$myGlobalMethod
// const user = demo.app.config.globalProperties.$myGlobalMethod
// console.log(user);
</script>
