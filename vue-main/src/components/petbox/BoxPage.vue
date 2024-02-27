<template>
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                     <div class="box_s box01_1" :id=pets[0] :style="{backgroundImage:'url(sprites/hero/'+pets[1].id+'.png'}" v-for="pets in userInfoStore.userpets">
                        <div class="rank" @click="fightover">
                            <h5>{{ pets[1].level }}</h5>
                        </div>
                    </div>
                </div>
                <div class="select d-flex align-items-center  justify-content-center mt-auto" id="character_select" @click = "add = !add">
                    <h5 class="fw900 text-center align-middle text-danger" v-if="add">
                        角色編成
                    </h5>
                    <h5 class="fw900 text-center align-middle text-danger " v-else>
                        確定
                    </h5>
                </div>
                <div class="footer">
                    <div class="put-in">
                        <div :class="box_s" @click="fightover" :style="{backgroundImage:'url(sprites/hero/'+image+'.png'}"></div>
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
const image = ref('')
const box_s= ref('box01')
console.log(userInfoStore.userpets);
function fightover() {
    console.log(userInfoStore.userpets);
    image.value= '001';
    box_s.value = 'box01_1'
}
</script>
