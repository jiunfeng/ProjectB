<template>
    <div class="container">
        <div class="wapper">
            <div class="d-flex justify-content-end">
                <button class="btn btn-dark" @click="changePage('MainPage')">主畫面</button>
            </div>
            <div class="p-3">
                <h1 class="fw900 text-center p-3">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                    <div class="box_s box01_1" :id=pets[0]
                        :style="{ backgroundImage: 'url(sprites/hero/' + index + '.png' }"
                        v-for="(pets, index) in userInfoStore.userpets" @click="add ? '' : fightover(index)">
                        <div class="rank">
                            <h5>{{ pets['level'][0] }}</h5>
                        </div>
                    </div>
                </div>
                <div class="select d-flex align-items-center  justify-content-center mt-auto" id="character_select"
                    @click="add = !add, add ? selectchactor() : ''">
                    <h5 class="fw900 text-center align-middle text-danger" v-if="add">
                        角色編成
                    </h5>
                    <h5 class="fw900 text-center align-middle text-danger " v-else>
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
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="/box/css/index_box.css">
    <link rel="stylesheet" href="/box/css/bootstrap.min.css">
    <link rel="stylesheet" href="/box/css/sweetalert2.min.css">
</template>


<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import { ref } from 'vue'

const userInfoStore = useUserInfoStore()
const changePage = (page) => {
    userInfoStore.currentPage = page;
}
var key_id = [];
for (let keys of userInfoStore.userpetset.values()) {
    key_id.push(keys.id);
    console.log(userInfoStore.userpets)
}
// console.log('set:'+userInfoStore.userpetset.values());

console.log(key_id);
// console.log(parseInt(key_id[1])); 使用迴圈輸出int

const add = ref(true)
const key1 = ref(key_id[0])
const key2 = ref(key_id[1])
const key3 = ref(key_id[2])

function delimage(data) {
    key_id.splice(data, 1, '');
    key1.value = key_id[0]
    key2.value = key_id[1]
    key3.value = key_id[2]
}

function fightover(data) {
    console.log(data);
    if (key_id.includes(data)) {
        key_id.splice(key_id.indexOf(data), 1, '');
    } else {
        if (key_id.indexOf('') == -1) {
        } else {
            key_id.splice(key_id.indexOf(''), 1, data);
        }
    }
    key1.value = key_id[0]
    key2.value = key_id[1]
    key3.value = key_id[2]
}

function selectchactor() {
    if (key_id.indexOf('') == '-1') {
        for (var i = 0; i < 3; i++) {
            userInfoStore.userpetset.set(i + 1, { ...userInfoStore.userpets[key_id[i]], 'id': key_id[i] });
        }
    }else{
        add.value=false;
        alert("未選取三隻精靈");
    }

    // console.log(key_id[1]);
    //console.log(userInfoStore.userpetset);
    // console.log(userInfoStore.userpets[key_id[1]]);
    // console.log(userInfoStore.userpetset.get(1));
    // console.log(userInfoStore.userpetset.get(2));
    // console.log(userInfoStore.userpetset.get(3));
}
</script>