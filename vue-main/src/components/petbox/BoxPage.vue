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
                        v-for="(pets, index) in userInfoStore.userpets"
                        @click="add ? reg(pets, index) : fightover(index)">
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

        <!-- <div class="upgrade" :class="[isShow ? 'visible' : 'invisible']" @click.self="isShow = !isShow"> -->
        <transition name="f1">
            <div class="upgrade" v-show="isShow" @click.self="isShow = !isShow">
                <transition>
                    <div class="upgrade-table translate-middle" v-show="isShow">
                        <transition name="f2">
                            <div class="" v-show="isShow">
                                <div class="border rounded m-4 bg-danger p-5">
                                    <div class="d-flex">
                                        <img v-bind:src="'sprites/hero/' + c_img + '.png'" alt="">
                                        <div class="ms-5 flex-fill">
                                            <p>{{ c_name }} LV {{ c_level }}</p>
                                            <!-- <p>HP {{ c_health }}ATK {{ c_attack }}</p> -->
                                            <div class="level" style="width: 100%;height: 2px;background-color: #fff;">
                                                <div class="transition"
                                                    :style="{ transition: slider ? '1s' : 'none', width: exp + '%' }">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border rounded m-4 bg-danger p-5">
                                    <div class="" style="height:400px;">
                                        <div class="d-flex justify-content-center">
                                            <img v-bind:src="'sprites/hero/007.png'" alt="">
                                        </div>
                                        <div>
                                            <hr>
                                            <div class="d-flex justify-content-center">
                                                <p>擁有:{{ userExpitem }}</p>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <p class="d-flex">使用</p><select name="" id="" v-model="selectExpitem">
                                                    <option v-for="n in parseInt(userExpitem)" :value="n">{{ String(n)
                                                        }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <p>{{ userExpitem }}→<span class="text-warning">{{ userExpitem -
                    selectExpitem
                                                        }}</span>
                                                    個
                                                </p>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <button class="btn btn-warning" @click="cancel()">取消</button>
                                                <button class="btn btn-primary" @click=levelup()>使用</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </transition>
            </div>
        </transition>
    </div>

    <link rel="stylesheet" href="/box/css/index_box.css">
    <link rel="stylesheet" href="/box/css/bootstrap.min.css">
    <link rel="stylesheet" href="/box/css/sweetalert2.min.css">
</template>


<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import { ref} from 'vue'

const userInfoStore = useUserInfoStore();
const changePage = (page) => {
    userInfoStore.currentPage = page;
}
var key_id = [];
for (let keys of userInfoStore.userpetset.values()) {
    key_id.push(keys.id);
}
// console.log('set:'+userInfoStore.userpetset.values());

console.log(key_id);
// console.log(parseInt(key_id[1])); 使用迴圈輸出int

const add = ref(true)
const key1 = ref(key_id[0])
const key2 = ref(key_id[1])
const key3 = ref(key_id[2])
const c_img = ref()
const pet = ref([])
// const c_name = ref()
// const c_level = ref()
// const c_health =ref()
// const c_attack =ref()
const [c_name, c_level, c_pastlevel] = Array(3).fill().map(() => ref());
const exp = ref()
const userExptype = ref('001')
const userExpitem = ref(userInfoStore.useritems.split('|')[0].split(',')[1]);
console.log(userExpitem);
console.log(exp.value);
const selectExpitem = ref(1)
const slider = ref(true)

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
    } else {
        add.value = false;
        alert("未選取三隻精靈");
    }

    // console.log(key_id[1]);
    //console.log(userInfoStore.userpetset);
    // console.log(userInfoStore.userpets[key_id[1]]);
    // console.log(userInfoStore.userpetset.get(1));
    // console.log(userInfoStore.userpetset.get(2));
    // console.log(userInfoStore.userpetset.get(3));
}
const isShow = ref(false);
function cancel() {
    isShow.value = false
}
function reg(pets, index) {
    isShow.value = true;
    console.log(index);
    c_img.value = index;
    pet.value = pets;
    console.log(pets);
    c_name.value = pets.name;
    // c_health.value = pets.health;
    // c_attack.value = pets.attack;
    c_level.value = pets.level[0];
    exp.value = pets.level[1];
    console.log(exp.value);
    console.log(c_name.value)
    console.log(pet.value.level[0])
    selectExpitem.value = 1
}
const show = ref(true)
const visibleDiv = ref(0);
const displaynone = (data) => {
    visibleDiv.value = data;
    console.log(visibleDiv.value);
}
// watch(() => c_level.value, (newValue1, oldValue1) => {
//     if (newValue1 > oldValue1) {
//         exp.value = 100;
//         setTimeout(() => {
//             slider.value = false
//             exp.value = 0
//         }, 980);
//         setTimeout(() => {
//             slider.value = true
//             exp.value = userInfoStore.userpets[c_img.value].level[1];
//         }, 1200);
//     }
// });
function levelup() {
    userInfoStore.petLevelUp(c_img.value, userExptype.value, selectExpitem.value).then(() => {
        c_pastlevel.value = c_level.value
        c_level.value = userInfoStore.userpets[c_img.value].level[0]
        console.log(c_pastlevel.value, c_level.value)
        if (c_level.value > c_pastlevel.value) {
            exp.value = 100
            console.log(exp.value);
            setTimeout(() => {
                slider.value = false
                exp.value = 0
            }, 980);
            setTimeout(() => {
                slider.value = true
                exp.value = userInfoStore.userpets[c_img.value].level[1];
            }, 1200);
        } else {
            exp.value = userInfoStore.userpets[c_img.value].level[1]
        }
        userExpitem.value = userInfoStore.useritems.split('|')[0].split(',')[1]
    });

}



</script>

<!-- <div class="" style="height:400px;">
    <div id="exp-fruit1" class="border" @click="show = !show, displaynone(show ? 0 : 1)"
        v-show="visibleDiv == 1 || visibleDiv === 0">
        <img v-bind:src="'sprites/hero/007.png'" alt="">
    </div>
</div> -->

<!-- <transition name="f1">
                            <div id="exp-fruit1" class="border block" @click="show = !show, displaynone(show ? 0 : 1)"
                                v-show="visibleDiv == 1 || visibleDiv === 0"
                                :class="{ 'hidden': visibleDiv !== 1 && visibleDiv !== 0 }"
                                :style="{ height: visibleDiv ? '400px' : '100px' }" :key="vf-1">
                                <img v-bind:src="'sprites/hero/007.png'" alt="">
                            </div>
                        </transition> -->
<!-- <transition name="f2">
                            <div id="exp-fruit2" class="border " @click="show = !show, displaynone(show ? 0 : 2)"
                                v-show="visibleDiv == 2 || visibleDiv === 0"
                                :class="{ 'hidden': visibleDiv !== 2 && visibleDiv !== 0 }"
                                :style="{ height: visibleDiv ? '400px' : '100px'}">
                                <img v-bind:src="'sprites/hero/008.png'" alt="" class="">
                            </div>
                        </transition> -->
<!-- <div id="exp-fruit3" class="border flex-fill" @click="show=!show,displaynone(show?0:3)" v-show="visibleDiv == 3|| visibleDiv === 0" :class="{ 'hidden': visibleDiv !== 3 && visibleDiv !== 0 }" :style="{ height: visibleDiv ? '400px' : '100px'}">
                            <img v-bind:src="'sprites/hero/009.png'" alt="" class="">
                        </div> -->