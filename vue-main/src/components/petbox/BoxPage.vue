<template>
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                    <div class="box_s box01_1" :id=pets[0] :style="{ backgroundImage: 'url(sprites/hero/' + pets[1].id + '.png' }"
                        v-for="pets in userInfoStore.userpets" @click="add?'':fightover(pets[1].id)">
                        <div class="rank">
                            <h5>{{ pets[1].level }}</h5>
                        </div>
                    </div>
                </div>
                <div class="select d-flex align-items-center  justify-content-center mt-auto" id="character_select"
                    @click="add = !add">
                    <h5 class="fw900 text-center align-middle text-danger" v-if="add">
                        角色編成
                    </h5>
                    <h5 class="fw900 text-center align-middle text-danger " v-else @click = "selectchactor(userInfoStore.userpets[4][1])">
                        確定
                    </h5>
                </div>
                <div class="footer">
                    <div class="put-in">
                        <div class="box01_1" :style="{ backgroundImage: 'url(sprites/hero/' + (add?set[1].id:image) + '.png' }" v-for="set in userInfoStore.userpetset">
                        </div>
                        <!-- <div class="box01"></div>
                        <div class="box01"></div> -->
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
const box_s = ref('box01')
console.log(userInfoStore.userpets);
function fightover(data) {
    console.log(userInfoStore.userpets);
    image.value = data
    box_s.value = 'box01_1'
}

function selectchactor(data){
    // console.log(data);
    // console.log(userInfoStore.userpetset.get(3));
    console.log(userInfoStore.userpetset.get(2));
    console.log(userInfoStore.userpets[4][1]);
    return userInfoStore.userpetset.set(1,data),userInfoStore.userpetset.set(2,data);
}
</script>
