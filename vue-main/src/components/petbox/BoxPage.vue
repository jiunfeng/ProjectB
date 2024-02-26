<template>
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                     <div class="box_s box01_1" :style="{backgroundImage:'url(sprites/hero/'+turn[1].id+'.png'}" v-for="turn in userInfoStore.userpetset">
                        <div class="rank" @click="fightover">
                            <h5>{{ turn[1].level }}</h5>
                        </div>
                    </div>
                </div>
                <div class="select d-flex align-items-center  justify-content-center" id="character_select" @click = "add = !add">
                    <h5 class="fw900 text-center align-middle text-danger" v-if="add">
                        角色編成
                    </h5>
                    <h5 class="fw900 text-center align-middle text-danger " v-else>
                        確定
                    </h5>
                </div>
                <div class="footer">
                    <div class="put-in">
                        <div class="box01"></div>
                        <div class="box01"></div>
                        <div class="box01"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="/box/css/index_box.css">
    <link rel="stylesheet" href="/box/css/bootstrap.min.css">
</template>
<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const add = ref(true)
console.log(userInfoStore.userpetset.get(2));
function fightover() {
    console.log(userInfoStore.userpetset.get(2).level);
    h5.text='100';
}
</script>
