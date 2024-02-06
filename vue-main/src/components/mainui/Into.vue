<template>
    <div class="body1 mx-auto row">
        <!-- 灰色內容 -->
        <div class="box bg1 row">
            <img class="inbox1 translate-middle-x" src="https://fakeimg.pl/100x100/200">
            <!-- 帳號 -->
            <label for="in1" class="inbox2 text-white">帳號 :</label>
            <div>
                <input type="text" class="inbox3 form-control is-invalid" name="in1" id="in1" placeholder="請輸入5~8個之間的英文數字"
                    oninput="value=value.replace(/[^\w\.\/]/ig,'')">
                <!-- 只能輸入數字和英文 -->
                <div class="valid-feedback inbox3-1">字數符合</div>
                <div class="invalid-feedback inbox3-2" id="inva01">字數請在5~8之內</div>
                <div class="invalid-feedback inbox3-3 d-none" id="inva02">帳號已存在</div>
            </div>
            <!-- 密碼 -->
            <label for="in2" class="inbox4 text-white">密碼 :</label>
            <div>
                <input type="password" class="inbox5 form-control is-invalid" name="in2" id="in2"
                    placeholder="請輸入1~8個之間的英文數字" oninput="value=value.replace(/[^\w\.\/]/ig,'')">
                <div class="inbox5-1 valid-feedback">字數符合</div>
                <div class="inbox5-2 invalid-feedback" id="inva01">字數請在5~8之內</div>
            </div>
            <!-- 登入按鈕 -->
            <input class="inbox8 border border-success" type="image" src="https://fakeimg.pl/50x50/200/?text=change" alt=""
                name="" id="" onclick="send();" />
        </div>
    </div>
</template>

<script setup>
import '@/mainside/css/bootstrap.min.css'
import '@/mainside/css/into1.css'
</script>

