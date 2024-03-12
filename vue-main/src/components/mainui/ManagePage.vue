<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <!-- <a class="btn btn-info" href="add">新增</a>  -->

                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-danger">刪除</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-info">返回上一頁</button>
                </div>
            </div>
            <form action="delete" name="list">
                <table class="table table-bordered">
                    <tr style="background-color: #f5f3da;">
                        <th class="text-center">
                            <input type="checkbox" class="form-check-input" id="all">
                        </th>
                        <th class="text-center">帳號</th>
                        <th class="text-center">密碼</th>
                        <th class="text-center">使用者名字</th>
                        <th class="text-center">等級</th>
                        <th class="text-center">錢</th>
                        <th class="text-center">經驗</th>
                        <th class="text-center">持有角色</th>
                        <th class="text-center">隊伍狀態</th>                        <td class="text-center">修改</td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <input type="checkbox" class="chk form-check-input" name="id[]" value="{{ $data->id }}">
                        </td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">123</td>
                        <td class="text-center">
                            <button class="btn btn-success">修改</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script setup>
// #預設
import "@/assets/index1.css"
// 須自己打的預設
import { ref, computed } from 'vue'
// 控制使用者currentPage導向
// 連線userInfo.js的資料
import { useUserInfoStore } from "@/stores/userInfo";


// $(document).ready(function() {
//   $("#all").click(function() {
//     if ($(this).is(":checked")) {
//       $(".chk").attr("checked", true);
//     } else {
//       $(".chk").attr("checked", false);
//     }
//   });
// });

</script>