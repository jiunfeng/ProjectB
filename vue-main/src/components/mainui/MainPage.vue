<template>
    <div class="body1 mx-auto row">
        <!-- 上方 -->
        <div class="index1">
            <!-- 頭貼 左上方，需資料庫資料-->
            <img class="inbox1-1" src="@/mainside/images/index/1-1-2.png" alt="">
            <img class="inbox1-1-1" src="https://fakeimg.pl/50x50/200">
            <!-- 人物資訊 左上方，需資料庫資料 -->
            <div class="inbox1-1-2 bg1">
                <span class="text-white mx-2">LV.XXXXX</span>
                <br>
                <span class="text-white mx-3">XXX</span>
                <div style="height: 3px; user-select: none;"></div>
                <div class="bg-white mx-1" style="height: 2px;"></div>
                <span class="text-white mx-2">ID:</span><span class="text-white me-3">XXXXXXXXX</span>
                <div style="height: 3px; user-select: none;"></div>
            </div>
            <!-- 資源 -->
            <div class="inbox1-2 bg1">
                <!-- 錢 上方，需資料庫資料 -->
                <img class="mx-2" src="@/mainside/images/index/money2.png" style="width: 50px; height: 50px;">
                <span class="text-white me-4">XXXXXXXXX</span>
                <!-- 經驗 上方，需資料庫資料 -->
                <img class="mx-2 my-2" src="@/mainside/images/index/exp2.png" style="width: 50px; height: 50px;">
                <span class="text-white">XXXXXXXXX</span>&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <!-- 下方 -->
        <div class="index2">
            <!-- 角色圖案 下方中間，需資料庫資料-->
            <img class="inbox2-1 translate-middle-x" src="https://fakeimg.pl/500x700/200/?text=character">
            <!-- 換角色按鈕 下方右邊-->
            <input class="inbox2-2" type="image" src="https://fakeimg.pl/50x50/200/?text=change" alt="" name="" id=""
                onclick="send();" />
            <!-- 戰鬥按鈕 中間左邊-->
            <input class="inbox2-3" type="image" src="https://fakeimg.pl/200x100/200/?text=fight" alt="" name="" id=""
                onclick="send();" />
            <!-- 箱子按鈕 中間左邊-->
            <input class="inbox2-4" type="image" src="https://fakeimg.pl/150x80/200/?text=box" alt="" name="" id=""
                onclick="send();" />
            <!-- 幻燈片 中間右邊-->
            <div id="carouselExampleIndicators" class="pic01 carousel slide" data-bs-ride="carousel" key="car">
                <div class="carousel-indicators" key="bnt">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1" key="btn1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2" key="btn2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3" key="btn3"></button>
                </div>
                <div class="carousel-inner" key="img">
                    <div class="carousel-item active" data-bs-interval="2000" key="img1">
                        <img src="https://fakeimg.pl/400x230/F00/?text=settings1" class="d-block w-100" alt="..."
                            key="img1-1">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000" key="img2">
                        <img src="https://fakeimg.pl/400x230/F00/?text=settings2" class="d-block w-100" alt="..."
                            key="img2-1">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000" key="img3">
                        <img src="https://fakeimg.pl/400x230/F00/?text=settings3" class="d-block w-100" alt="..."
                            key="img3-1">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@/mainside/css/bootstrap.min.css'
import '@/mainside/css/index1.css'
import { useUserInfoStore } from "@/stores/userInfo";
const userStore = useUserInfoStore();

</script>

