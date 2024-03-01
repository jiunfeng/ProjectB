<template>
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                    <div class="box_s box01_1" :id=pets[0]
                        :style="{ backgroundImage: 'url(sprites/hero/' + pets[1].id + '.png' }"
                        v-for="pets in userInfoStore.userpets" @click="add ? '' : fightover(pets[1].id)">
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
                    <h5 class="fw900 text-center align-middle text-danger " v-else @click="selectchactor()">
                        確定
                    </h5>
                </div>
                <div class="footer">
                    <div class="put-in">
                        <div class="box01_1" :style="{ backgroundImage: 'url(sprites/hero/' + key1 + '.png' }"
                            @click="add ? '' : delimage(0)">
                        </div>
                        <div class="box01_1" :style="{ backgroundImage: 'url(sprites/hero/' + key2 + '.png' }"
                            @click="add ? '' : delimage(1)">
                        </div>
                        <div class="box01_1" :style="{ backgroundImage: 'url(sprites/hero/' + key3 + '.png' }"
                            @click="add ? '' : delimage(2)">
                        </div>
                        <!-- <div class="box01_1" :style="{ backgroundImage: 'url(sprites/hero/' + (add?set[1].id:setimage()) + '.png' }" v-for="set in userInfoStore.userpetset">
                        </div> -->
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
var key_s = [];
for (let keys of userInfoStore.userpetset.values()) {
    key_s.push(keys.id);
}
const add = ref(true)
const box_s = ref('box01')
const key1 = ref(key_s[0])
const key2 = ref(key_s[1])
const key3 = ref(key_s[2])
// function setimage(data){
// for(let keys of userInfoStore.userpetset.values()){
//     key_s.push(keys);
// }
// return key_s[data].id
// }

function delimage(data) {
    key_s.splice(data, 1, '');
    key1.value = key_s[0]
    key2.value = key_s[1]
    key3.value = key_s[2]
}

// console.log(userInfoStore.userpets);
function fightover(data) {
    if (key_s[0] == '') {
        key_s.splice(0,1,data);
    }else if(key_s[1] == ''){
        key_s.splice(1,1,data);
    }else if(key_s[2] == ''){
        key_s.splice(2,1,data);
    }
    key1.value = key_s[0]
    key2.value = key_s[1]
    key3.value = key_s[2]
    box_s.value = 'box01_1'
}

function selectchactor() {
    // console.log(data);
    // console.log(userInfoStore.userpetset.get(3));
    // console.log(userInfoStore.userpetset.get(2));
    // console.log(userInfoStore.userpets[4][1]);
    // console.log(userInfoStore.userpetset.size);
    console.log(key_s);
    // userInfoStore.userpetset.set(1,userInfoStore.userpets[data1][1]);
    // userInfoStore.userpetset.set(2,userInfoStore.userpets[data2][1]);
    // userInfoStore.userpetset.set(3,userInfoStore.userpets[data3][1]);
    // for(var i=0;i<userInfoStore.userpetset.size;i++){
    //     console.log(userInfoStore.userpetset.get(i+1));
    // }

    // return userInfoStore.userpetset.set(1,userInfoStore.userpets[data1-1][1]),userInfoStore.userpetset.set(2,userInfoStore.userpets[data2-1][1]),userInfoStore.userpetset.set(3,userInfoStore.userpets[data3-1][1]);
}
</script>
