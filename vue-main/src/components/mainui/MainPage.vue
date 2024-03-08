<template>
    <div class="body1 mx-auto br">
        <!-- 上方 -->
        <!-- 頭貼 左上方，需資料庫資料-->
        <img class="userimg1" src="/mainui/images/index/1-1-2.png" alt="">
        <img class="userimg1-1" src="/mainui/images/role/002_small.png" alt="">
        <button type="button" class="userimg1-2"></button>
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
        <!-- 角色圖案 下方中間，需資料庫資料-->
        <!-- <img class="conimg1 translate-middle-x" src="/mainui/images/role/role2-1.jpg"> -->
        <img class="conimg1 translate-middle-x" src="/sprites/hero/001.png">
        <!-- 換角色按鈕 下方右邊-->
        <button type="submit" class="conchangimg1" @click.self="chgin"></button>
        <!-- 戰鬥按鈕 中間左邊-->
        <button type="submit" class="btnfight1" @click="changePage('game')" @mouseover="fightover"
            @mouseleave="fightleave" v-bind:style="{ backgroundImage: 'url(' + fightimg1 + ')' }"></button>
        <!-- 箱子按鈕 中間左邊-->
        <button type="submit" class="btnbox1" @click="changePage('box')" @mouseover="boxover" @mouseleave="boxleave"
            v-bind:style="{ backgroundImage: 'url(' + boximg1 + ')' }"></button>
        <!-- 幻燈片 中間右邊-->

        <!-- 引用在public中的css -->
        <link rel="stylesheet" href="/mainui/css/index1.css">
        <link rel="stylesheet" href="/mainui/css/bootstrap.min.css">

        <!-- 換角色頁面 -->
        <div class="chg-mask mx-auto" :style="chgdivsty" @click.self="chglev">
            <div class="chg-container translate-middle" :style="chgdivsty1">
                <div class=" border border-4" :style="{width: '100%',height:'100%' }">
                    <!-- 離開按鈕 -->
                    <button class="chg-leavbtn border-4 translate-middle" @click.self="chglev"
                        :style="chgdivsty2"></button>

                        <label class=" mx-auto text-center align-content-center" for="">更換角色</label>
                        <br>
                    <button class="chgimg" :id=pets[0]
                        :style="{ display: test ? '' : 'none', backgroundImage: 'url(sprites/hero/' + index + '.png' }"
                        v-for="(pets, index) in userStore.userpets" @click="chgimg($index)">
                    </button>

                    <!-- 確定按鈕 -->
                    <button class="chg-btn translate-middle-x" type="button" @click="chg"
                        :style="chgdivsty2">確定</button>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
// 須自己打的預設
import { ref, computed } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";
// 宣告userStore擁有userInfo.js的資料
const userStore = useUserInfoStore();
const changePage = (page) => {
    userStore.currentPage = page;
}
// fightimg圖片改變
const fightimg1 = ref('/mainui/images/index/fight1.png');
// 進入元素
function fightover() {
    fightimg1.value = '/mainui/images/index/fight2.png'
}
// 離開元素
function fightleave() {
    fightimg1.value = '/mainui/images/index/fight1.png'
}

// boximg圖片改變
const boximg1 = ref('/mainui/images/index/box1.png');
// 進入元素
function boxover() {
    boximg1.value = '/mainui/images/index/box2.png'
}
// 離開元素
function boxleave() {
    boximg1.value = '/mainui/images/index/box1.png'
}
console.log("rank:" + userStore.userrank[0]);

console.log(userStore.userpets);
console.log(userStore.petNumbers);

// 換角色
const test = ref(false);

const isShow = ref(false);
const chgdivsty = computed(() => {
    return { "height": isShow.value ? "100%" : "0%" };
});
const chgdivsty1 = computed(() => {
    return { "width": isShow.value ? "80%" : "0%" };
});
const chgdivsty2 = computed(() => {
    return { "display": isShow.value ? "" : "none" };
});


console.log(chgdivsty);
// 顯示角色頁面
function chgin() {
    isShow.value = true;
    test.value = !test.value;
    console.log(isShow.value);
    console.log(chgdivsty.value);
    console.log(test.value);
}
// 隱藏角色頁面
function chglev() {
    isShow.value = false;
    test.value = !test.value;
    console.log(isShow.value);
    console.log(chgdivsty.value);
    console.log(test.value);
}

// import { computed } from 'vue';
// import { getCurrentInstance } from 'vue';
// const {proxy} = getCurrentInstance();


// const demo = getCurrentInstance()
// const user = demo.appContext.config.globalProperties.$myGlobalMethod
// const user = demo.app.config.globalProperties.$myGlobalMethod
// console.log(user);
</script>
