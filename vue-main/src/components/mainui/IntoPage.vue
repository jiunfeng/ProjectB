<template>
    <div class="body1 mx-auto">
        <!-- 灰色內容 -->
        <div class="box bg1 translate-middle">
            <img class="welcome translate-middle" src="/mainui/images/into/welcome.png" alt="">
            <!-- 帳號 -->
            <label for="in1" class="text1 text-white">帳號 :</label>
            <div class="inputdiv1">
                <input type="text" class="input1 form-control is-invalid" v-model="account" name="in1" id="in1"
                    placeholder="請輸入5~8個之間的英文數字" oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <!-- 只能輸入數字和英文 -->
                <div class="valid-feedback input1-1" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="invalid-feedback input1-2" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
                <div class="invalid-feedback input1-3 d-none" id="inva02">&nbsp;帳號已存在</div>
            </div>
            <!-- 密碼 -->
            <label for="in2" class="text2 text-white">密碼 :</label>
            <div class="inputdiv2">
                <input type="password" class="input2 form-control is-invalid" v-model="password" name="in2" id="in2"
                    placeholder="請輸入5~8個之間的英文數字" oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <div class="input2-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="input2-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;字數請在5~8之內</div>
            </div>
            <!-- 登入按鈕 -->
            <button class="btn1 border border-success" type="button" @click="into"></button>
            <!-- 註冊按鈕 -->
            <button class="btn2 border border-success" type="button" data-bs-toggle="modal"
                data-bs-target="#exampleModal"></button>
        </div>
    </div>

    <!-- 註冊頁面 -->
    <div class="reg-mask mx-auto" :style="regdivsty">
        <div class="reg-container" @click.self="reg">
            <div class="reg-body"></div>
        </div>
    </div>

    <link rel="stylesheet" href="/mainui/css/into1.css">
    <link rel="stylesheet" href="/mainui/css/bootstrap.min.css">
</template>

<script setup>
import { ref } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";
// 宣告userStore擁有userInfo.js的資料
const userStore = useUserInfoStore();

const account = ref('')
const password = ref('')
const main = ref('main')
const isShow = ref(true);
function into() {
    // console.log(account.value);
    if (account.value == userStore.useraccount && password.value == userStore.userpassword) {
        // console.log(userStore.useraccount);
        // console.log(userStore.userpassword);
        userStore.currentPage = main;
    }
}
// 註冊
const regdivsty = computed(() => {
    return { 'display': isShow ? '' : 'none' }
})

</script>

<style scoped></style>




