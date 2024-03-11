<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <!-- <a class="btn btn-info" href="add">新增</a>  -->

                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="btn btn-danger" href="javascript:deleteAll()">刪除</a>
                    <a class="btn btn-info" href="add">返回上一頁</a>
                </div>
            </div>
            <form action="delete" name="list">
                <table class="table table-bordered">
                    <tr style="background-color: #f5f3da;">
                        <th class="text-center">
                            <input type="checkbox" class="form-check-input" id="all">
                        </th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <th class="text-center">商店名稱</th>
                        <td class="text-center">修改</td>
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
                        <td class="text-center"><a href="#" class="btn btn-success">修改</a></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>