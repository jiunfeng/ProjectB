<template>
    <div class="body1 mx-auto">
        <!-- 灰色內容 -->
        <div class="box bg1 translate-middle">
            <img class="welcome translate-middle" src="/mainui/images/into/welcome.png" alt="">
            <!-- 帳號 -->
            <label for="in1" class="text1 text-white">帳號 :</label>
            <div class="inputdiv1">
                <input type="text" class="input1 form-control"
                    :class="{ 'is-invalid': account.length < 5 || account.length > 8, 'is-valid': account.length >= 5 && account.length <= 8 }"
                    v-model="account" name="in1" id="in1" placeholder="請輸入5~8個之間的英文數字"
                    oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <!-- 只能輸入數字和英文 -->
                <div class="valid-feedback input1-1" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="invalid-feedback input1-2" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
                <!-- <div class="invalid-feedback input1-3 d-none" id="inva02">&nbsp;帳號已存在</div> -->
            </div>
            <!-- 密碼 -->
            <label for="in2" class="text2 text-white">密碼 :</label>
            <div class="inputdiv2">
                <input type="password" class="input2 form-control"
                    :class="{ 'is-invalid': password.length < 5 || password.length > 8, 'is-valid': password.length >= 5 && password.length <= 8 }"
                    v-model="password" name="in2" id="in2" placeholder="請輸入5~8個之間的英文數字"
                    oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <div class="input2-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="input2-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
            </div>
            <!-- 登入按鈕 -->
            <button class="btninto" type="button" @click="into">登入</button>
            <!-- 註冊按鈕 -->
            <button class="btn2" type="button" @click="reg">註冊</button>
        </div>

        <!-- 註冊頁面 -->
        <div class="reg-mask mx-auto" :style="regdivsty" @click.self="regmask">
            <div class="reg-container translate-middle" :style="regdivsty1">
                <!-- 離開按鈕 -->
                <button class="reg-leavbtn border-4 translate-middle" @click.self="regmask" :style="regdivsty2"></button>
                <img class="reg-img1 translate-middle-x" src="/mainui/images/into/reg.png" alt="" :style="regdivsty2">
                <!-- 帳號 -->
                <label for="in1" class="reg-text1" :style="regdivsty2">帳號 :</label>
                <div class="reg-inputdiv1" :style="regdivsty2">
                    <input type="text" class="reg-input1 form-control"
                        :class="{ 'is-invalid': regaccount.length < 5 || regaccount.length > 8, 'is-valid': regaccount.length >= 5 && regaccount.length <= 8 }"
                        v-model="regaccount" name="in1" id="in1" placeholder="請輸入5~8個之間的英文數字"
                        oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                    <!-- 只能輸入數字和英文 -->
                    <div class="valid-feedback input1-1" style="font-size: 25px;">&nbsp;字數符合</div>
                    <div class="invalid-feedback input1-2" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
                    <!-- <div class="invalid-feedback input1-3 d-none" id="inva02">&nbsp;帳號已存在</div> -->
                </div>
                <!-- 密碼 -->
                <label for="in2" class="reg-text2" :style="regdivsty2">密碼 :</label>
                <div class="reg-inputdiv2" :style="regdivsty2">
                    <input type="password" class="reg-input2 form-control"
                        :class="{ 'is-invalid': regpassword.length < 5 || regpassword.length > 8, 'is-valid': regpassword.length >= 5 && regpassword.length <= 8 }"
                        v-model="regpassword" name="in2" id="in2" placeholder="請輸入5~8個之間的英文數字"
                        oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                    <div class="input2-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                    <div class="input2-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
                </div>
                <!-- 註冊按鈕 -->
                <button class="reg-btn translate-middle-x" type="button" @click="regin" :style="regdivsty2">註冊</button>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="/mainui/css/into1.css">
    <link rel="stylesheet" href="/mainui/css/bootstrap.min.css">
</template>

<script setup>
// import "@/assets/into1.css"
import { ref, computed } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";
// 宣告userStore擁有userInfo.js的資料
const userStore = useUserInfoStore();

// 登入
const account = ref('')
const password = ref('')
// 註冊
const regaccount = ref('')
const regpassword = ref('')
// const main = ref('main')
// const regdivsty = ref(false)

function into() {
    if ((account.value.length >= 5 && account.value.length <= 8) && (password.value.length >= 5 && password.value.length <= 8)) {
        userStore.login(account.value, password.value).then(() => {
            console.log(userStore.usermoney + "內money")
            console.log(userStore.message + "內訊息")
            userStore.currentPage = "main"
        })

    }
    else {
        alert('請輸入正確的字數')
    }
    // if (account.value == userStore.useraccount && password.value == userStore.userpassword) {
    //     // console.log(userStore.useraccount);
    //     // console.log(userStore.userpassword);
    //     userStore.currentPage = main;
    // }
}
// 註冊
const isShow = ref(false);
const regdivsty = computed(() => {
    return { "height": isShow.value ? "100%" : "0%" };
});
const regdivsty1 = computed(() => {
    return { "height": isShow.value ? "55%" : "0%" };
});
const regdivsty2 = computed(() => {
    return { "display": isShow.value ? "" : "none" };
});

console.log(regdivsty);
// 顯示註冊頁面
function reg() {
    isShow.value = true;
    console.log(isShow.value);
    console.log(regdivsty.value);
}
// 隱藏註冊頁面
function regmask() {
    isShow.value = false;
    console.log(isShow.value);
    console.log(regdivsty.value);
}
// 註冊執行
function regin() {
    if ((regaccount.value.length >= 5 && regaccount.value.length <= 8) && (regpassword.value.length >= 5 && regpassword.value.length <= 8)) {
        console.log(regaccount.value);
        console.log(regpassword.value);
        const message = userStore.login(regaccount.value, regpassword.value);
        console.log(message)
    }
    else {
        alert('請輸入正確的字數')
    }
}

</script>

<style scoped></style>





