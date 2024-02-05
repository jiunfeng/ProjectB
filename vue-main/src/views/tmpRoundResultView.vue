<template>
    <div class="about container-fluid">


        <div v-for="turn in DrawcalStore.roundResult">
            <h1 class="text-center m-2">{{ turn[0] }}</h1>
            <div class="row m-3">
                <div class="row">
                    <div class="col">該回合盤面結果</div>
                    <div class="col">要消除的珠子</div>
                    <div class="col">珠子要從A掉落到B</div>
                    <div class="col">每col要補的珠子數量顏色</div>
                    <div class="col">總combo </div>
                </div>
                <div class="col" v-for="value in turn[1]">

                    <h5 v-for="list in value">{{ list }}</h5>
                </div>
            </div>
        </div>




        <!-- <div v-for="(innerRow, innerRowIndex) in innerValue" :key="innerRowIndex">
        <div v-for="(innerCol, innerColIndex) in innerRow" :key="innerColIndex">
          {{ innerCol }}
        </div> 
    </div>-->
    </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        /* display: flex; */
        /* align-items: center; */
    }
}
</style>

<script setup>
import { useDrawcalStore } from "@/stores/gameRoundCal";
const DrawcalStore = useDrawcalStore();
// DrawcalStore.randomMatrix();


DrawcalStore.checkGem();




</script>