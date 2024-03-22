<template>
    <div class="body1 mx-auto">
        <!-- 灰色內容 -->
        <div class="box bg1 translate-middle">
            <img class="welcome translate-middle" src="/mainui/images/into/welcome.png" alt="">
            <!-- 帳號 -->
            <label for="in1" class="text1 text-white">帳號 :</label>
            <div class="inputdiv1">
                <input type="text" class="input1 form-control"
                    :class="{ 'is-invalid': account.length < min || account.length > max, 'is-valid': account.length >= min && account.length <= max }"
                    v-model="account" name="in1" id="in1" placeholder="請填入8~16個英文或數字"
                    oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <!-- 只能輸入數字和英文 -->
                <div class="valid-feedback input1-1" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="invalid-feedback input1-2" id="inva01" style="font-size: 25px;">&nbsp;請填入8~16個英文或數字</div>
                <!-- <div class="invalid-feedback input1-3 d-none" id="inva02">&nbsp;帳號已存在</div> -->
            </div>
            <!-- 密碼 -->
            <label for="in2" class="text2 text-white">密碼 :</label>
            <div class="inputdiv2">
                <input type="password" class="input2 form-control"
                    :class="{ 'is-invalid': password.length < min || password.length > max, 'is-valid': password.length >= min && password.length <= max }"
                    v-model="password" name="in2" id="in2" placeholder="請填入8~16個英文或數字"
                    oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                <div class="input2-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                <div class="input2-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;請填入8~16個英文或數字</div>
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
                <button class="reg-leavbtn border-4 translate-middle" @click.self="regmask"
                    :style="regdivsty2"></button>
                <img class="reg-img1 translate-middle-x" src="/mainui/images/into/reg.png" alt="" :style="regdivsty2">
                <!-- 帳號 -->
                <label for="reg1" class="reg-text1" :style="regdivsty2">帳號 :</label>
                <div class="reg-inputdiv1" :style="regdivsty2">
                    <input type="text" class="reg-input1 form-control"
                        :class="{ 'is-invalid': regaccount.length < min || regaccount.length > max, 'is-valid': regaccount.length >= min && regaccount.length <= max }"
                        v-model="regaccount" name="reg1" id="reg1" placeholder="請填入8~16個英文或數字"
                        oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                    <!-- 只能輸入數字和英文 -->
                    <div class="valid-feedback input1-1" style="font-size: 25px;">&nbsp;字數符合</div>
                    <div class="invalid-feedback input1-2" id="inva01" style="font-size: 25px;">&nbsp;請填入8~16個英文或數字
                    </div>
                    <!-- <div class="invalid-feedback input1-3 d-none" id="inva02">&nbsp;帳號已存在</div> -->
                </div>
                <!-- 密碼 -->
                <label for="reg2" class="reg-text2" :style="regdivsty2">密碼 :</label>
                <div class="reg-inputdiv2" :style="regdivsty2">
                    <input type="password" class="reg-input2 form-control"
                        :class="{ 'is-invalid': regpassword.length < min || regpassword.length > max, 'is-valid': regpassword.length >= min && regpassword.length <= max }"
                        v-model="regpassword" name="reg2" id="reg2" placeholder="請填入8~16個英文或數字"
                        oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                    <div class="input2-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                    <div class="input2-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;請填入8~16個英文或數字
                    </div>
                </div>
                <!-- 密碼確認 -->
                <label for="reg4" class="reg-text2-1" :style="regdivsty2">密碼再確認 :</label>
                <div class="reg-inputdiv2-1" :style="regdivsty2">
                    <input type="password" class="reg-input2-1 form-control"
                        :class="{ 'is-invalid': regpassword.length < min || regpassword.length > max, 'is-valid': regpassword.length >= min && regpassword.length <= max }"
                        v-model="regpass_ag" name="reg4" id="reg4" placeholder="請填入8~16個英文或數字"
                        oninput="value=value.replace(/[^\w\.\/]/ig,'')" style="font-size: 20px;">
                    <div class="input_ag valid-feedback" style="font-size: 25px;">&nbsp;密碼符合</div>
                </div>

                <!-- 使用者名稱 -->
                <label for="reg3" class="reg-text3" :style="regdivsty2">名字 :</label>
                <div class="reg-inputdiv3" :style="regdivsty2">
                    <input type="text" class="reg-input3 form-control"
                        :class="{ 'is-invalid': regname.length < namemin || regname.length > namemax, 'is-valid': regname.length >= namemin && regname.length <= namemax }"
                        v-model="regname" name="reg3" id="reg3" placeholder="請填入1~6個字" style="font-size: 20px;">
                    <div class="input3-1 valid-feedback" style="font-size: 25px;">&nbsp;字數符合</div>
                    <div class="input3-2 invalid-feedback" id="inva01" style="font-size: 25px;">&nbsp;請填入1~6個字</div>
                </div>
                <!-- 註冊按鈕 -->
                <button class="reg-btn translate-middle-x" type="button" @click="regin" :style="regdivsty2">註冊</button>
            </div>
        </div>
    </div>


    <!-- <link rel="stylesheet" href="/mainui/css/into1.css"> -->
    <link rel="stylesheet" href="/mainui/css/bootstrap.min.css">
</template>

<script setup>
import "@/assets/into1.css"
import { ref, computed } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";
// 宣告userStore擁有userInfo.js的資料
const userStore = useUserInfoStore();
// 字數
var min = 8;
var max = 16;
var namemin = 1;
var namemax = 6;
// 登入
const account = ref('')
const password = ref('')
// 註冊
const regaccount = ref('')
const regpassword = ref('')
const regname = ref('')
// const regdivsty = ref(false)

// 登入
function into() {
    if ((account.value.length >= min && account.value.length <= max) && (password.value.length >= min && password.value.length <= max)) {
        userStore.login(account.value, password.value).then(() => {
            console.log("message:" + userStore.message);
            if (userStore.message == "登入成功") {
                console.log(account.value);
                console.log(password.value);
                console.log("message:" + userStore.message);
                console.log("money:" + userStore.usermoney);
                console.log("rank:" + userStore.userrank[0]);
                console.log("exp:" + userStore.usercredit);

                // 跳轉頁面
                userStore.currentPage = "main";
            }
            else if (userStore.message == "帳號或密碼錯誤") {
                account.value = "";
                password.value = "";
                alert('請輸入正確的帳號或密碼');
            }
            else if (userStore.message == "未知錯誤") {
                account.value = "";
                password.value = "";
                alert('連線錯誤');
            }
        });

    }
    else {
        alert('請輸入正確的字數')
    }
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
    min = 8;
    namemin = 1;
    namemax = 6;
    if ((regaccount.value.length >= min && regaccount.value.length <= max) && (regpassword.value.length >= min && regpassword.value.length <= max) && (regname.value.length >= namemin && regname.value.length <= namemax)) {
        console.log(regaccount.value);
        console.log(regpassword.value);
        console.log(regname.value);
        userStore.register(regaccount.value, regpassword.value, regname.value).then(() => {
            if (userStore.message == "帳號創建完成") {
                alert('帳號註冊成功');
                isShow.value = false;
                account.value = regaccount.value;
            }
            else if (userStore.message == "該帳號已有人使用") {
                regaccount.value = "";
                alert('該帳號名稱已有人使用');
            }
            else if (userStore.message == "發生異常錯誤，帳號無法創建。") {
                account.value = "";
                password.value = "";
                alert('連線錯誤');
            }
        });
        // const message = userStore.login(regaccount.value, regpassword.value);
        // console.log(message)
    }
    else {
        alert('請輸入正確的字數')
    }
}

</script>

<style scoped></style>
