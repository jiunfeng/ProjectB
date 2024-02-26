<template lang="">
    <div class="container">
        <div class="wapper">
            <div>
                <h1 class="fw900 text-center p-5">背包</h1>
            </div>
            <div class="content">
                <div class="character">
                    <div class="box_s box01_1" style="background-image: url(/box/images/c1.png);" id="c1">
                        <div class="rank">
                            <h5>100</h5>
                        </div>
                    </div>
                    <div class="box_s box01_1" style="background-image: url(/box/images/c2.png);" id="c2">
                        <div class="rank">
                            <h5>90</h5>
                        </div>
                    </div>
                    <div class="box_s box01_1" style="background-image: url(/box/images/c3.png);" id="c3">
                        <div class="rank">
                            <h5>80</h5>
                        </div>
                    </div>
                    <div class="box_s box01_1" style="background-image: url(/box/images/c4.png);" id="c4">
                        <div class="rank">
                            <h5>70</h5>
                        </div>
                    </div>
                    <div class="box_s box01_1" style="background-image: url(/box/images/c5.png);" id="c5">
                        <div class="rank">
                            <h5>60</h5>
                        </div>
                    </div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                    <div class="box01"></div>
                </div>
                <div class="select d-flex align-items-center  justify-content-center" id="character_select">
                    <h5 class="fw900 text-center align-middle text-danger">角色編成</h5>
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

const userInfoStore = useUserInfoStore()
console.log(userInfoStore.username);

</script>