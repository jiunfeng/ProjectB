<template>
    <div class="">{{ key1}},{{ key2 }},{{ key3 }}</div>
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character" id="character">
                    <div class="box_s box01_1" :id=pets[0]
                        :style="{ backgroundImage: 'url(sprites/hero/' + pets[1].id + '.png' }"
                        v-for="pets in userInfoStore.userpets" @click="add ? '' : fightover(pets[1])">
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
                    <h5 class="fw900 text-center align-middle text-danger " v-else @click="selectchactor">
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
</template>
<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import { ref } from 'vue'


const userInfoStore = useUserInfoStore()
var key_s = [];
var key_id =[];
for (let keys of userInfoStore.userpetset.values()) {
    key_s.push(keys);
    key_id.push(keys.id)
}
const add = ref(true)
const key1 = ref(key_s[0].id)
const key2 = ref(key_s[1].id)
const key3 = ref(key_s[2].id)

function delimage(data) {
    key_s.splice(data, 1, '');
    key1.value = key_s[0].id
    key2.value = key_s[1].id
    key3.value = key_s[2].id
}

function fightover(data) {
    // console.log(data);
    // console.log(key_s);
    // console.log(key_s.includes(1));
    // console.log(key_s.indexOf(''));
    // console.log(key_s.includes(''));
    // if (key_s[0] == '') {
    //     key_s.splice(0, 1, data);
    // } else if (data.id == key_s[0].id){
    //     key_s.splice(0, 1, '')
    // }

    // if(key_s[1] == '') {
    //     key_s.splice(1, 1, data);
    // } else if(key_s[1].id == data.id) {
    //     key_s.splice(1, 1, '');
    // } 

    // if (key_s[2].id == data.id) {
    //     key_s.splice(2, 1, '');
    // }else if(key_s[2] == '') {
    //     key_s.splice(2, 1, data);
    // }
    if (key_s.includes('')) {
        key_s.splice(key_s.indexOf(''), 1, data);
        console.log("hello1");
        key1.value = key_s[0].id
        key2.value = key_s[1].id
        key3.value = key_s[2].id
        return
    }

    var key_s1= []
    for (var i = 0; i < 3; i++) {
        key_s1.push(key_s[i].id);
        if (key_s1.includes(data.id)) {
            key_s.splice(key_s1.indexOf(data.id), 1, '');
            key1.value = key_s[0].id
            key2.value = key_s[1].id
            key3.value = key_s[2].id
            return
        }
    }


}

function selectchactor() {
    for (var i = 0; i < 3; i++) {
        userInfoStore.userpetset.set(i + 1, key_s[i]);
    }
    console.log(userInfoStore.userpetset.get(1));
    console.log(userInfoStore.userpetset.get(2));
    console.log(userInfoStore.userpetset.get(3));
}
</script>
