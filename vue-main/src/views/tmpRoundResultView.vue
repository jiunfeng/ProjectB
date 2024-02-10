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
                    <div class="col">紅 </div>
                    <div class="col">藍</div>
                    <div class="col">綠 </div>
                    <div class="col">心</div>
                </div>
                <div class="col" v-for="value in turn[1]">

                    <h5 v-for="list in value">{{ list }}</h5>
                </div>
            </div>
        </div>

        <h5>陣列前為總傷害 後為是否全體攻擊</h5>
        <h1>紅傷害{{ DungeonStore.finalDmg[0] }}</h1>
        <h1>藍傷害{{ DungeonStore.finalDmg[1] }}</h1>
        <h1>綠傷害{{ DungeonStore.finalDmg[2] }}</h1>
        <h1>恢復力{{ DungeonStore.finalDmg[3] }}</h1>


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
        margin-top: 10vh;
    }
}
</style>

<script setup>
import { useDrawcalStore } from "@/stores/gameRoundCal";
import { useDungeonStore } from "@/stores/gameDungeon";
const DrawcalStore = useDrawcalStore();
const DungeonStore = useDungeonStore();
// DrawcalStore.randomMatrix();
// console.log(DrawcalStore.roundResult);

// DrawcalStore.checkGem();




</script>