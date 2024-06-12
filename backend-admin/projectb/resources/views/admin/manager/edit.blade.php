@extends("admin.app")
@section("title","會員修改")
@section("content")
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<!-- <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script> -->

<script>
    // 讓tabs分開
    $(function() {
        $("#tabs").tabs();
    });
</script>
<div>
    <a href="/manager" class="btn btn-success m-3">返回上一頁</a>
</div>

<div id="tabs">
    <ul>
        <li><a href="#tabs-1">帳號和密碼</a></li>
        <li><a href="#tabs-2">名字和等級</a></li>
        <li><a href="#tabs-3">錢和經驗</a></li>
        <li><a href="#tabs-4">持有角色</a></li>
        <li><a href="#tabs-5">隊伍</a></li>
    </ul>
    <form method="post" action="/manager/update/{{ $list->id }}" enctype="multipart/form-data">
        <!-- 第1格，帳號和密碼 -->
        <div id="tabs-1">
            <input type="hidden" name="id" value="{{ $list->id }}">
            <input type="hidden" name="account" value="{{ $list->account }}">
            {{ csrf_field() }}
            <div class="row">
                <div class="col-1 text-right">帳號</div>
                <div class="col-6">
                    <input type="text" name="account" class="form-control" value="{{ $list->account }}" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">密碼</div>
                <div class="col-6">
                    <input type="text" name="password" class="form-control" value="{{ $list->password }}" oninput="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="16" required>
                </div>
            </div>
        </div>
        <!-- 第2格，使用者名字和等級 -->
        <div id="tabs-2">
            <input type="hidden" name="id" value="{{ $list->id }}">
            <input type="hidden" name="account" value="{{ $list->account }}">
            {{ csrf_field() }}
            <div class="row">
                <div class="col-1 text-right">名字</div>
                <div class="col-6">
                    <input type="text" name="username" class="form-control" value="{{ $list->username }}" maxlength="6" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">等級</div>
                <div class="col-6">
                    <input type="number" name="rank" class="form-control" value="{{ $list->rank }}" maxlength="5" required>
                </div>
            </div>
        </div>
        <!-- 第3格，錢和經驗 -->
        <div id="tabs-3">
            <input type="hidden" name="id" value="{{ $list->id }}">
            <input type="hidden" name="account" value="{{ $list->account }}">
            {{ csrf_field() }}
            <div class="row">
                <div class="col-1 text-right">錢</div>
                <div class="col-6">
                    <input type="number" name="money" class="form-control" value="{{ $list->money }}" maxlength="10" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">經驗</div>
                <div class="col-6">
                    <input type="number" name="credit" class="form-control" value="{{ $list->credit }}" maxlength="10" required>
                </div>
            </div>
        </div>
        <!-- 第4格，持有角色 -->
        <div id="tabs-4">
            <input type="hidden" name="id" value="{{ $list->id }}">
            <input type="hidden" name="account" value="{{ $list->account }}">
            {{ csrf_field() }}
            <div class="">
                <div class="text-center">取消勾選來刪除角色</div>
                <br>
                <div class="col-10 overflow-auto mx-auto">

                    @php
                    $a=0;
                    $b=0;
                    @endphp
                    <div class="row text-center mx-auto">
                        @foreach($petallarry as $key=>$allone)
                        @php $a=$b; @endphp
                        @for($i = 0;$i < count($pet_have); $i ++) @if($allone==$pet_have[$i]) <div class="mx-auto">
                            <input class="disabled" type="checkbox" name="pet_have[]" value="{{ $allone }}" checked="checked">
                            <p>{{ $allone }}</p>
                            <img src="/images/hero/{{ $allone }}.png" width="200">
                    </div>
                    @php $a++; @endphp
                    @endif
                    @endfor

                    @if($a != $b)
                    @php continue; @endphp
                    @endif
                    <div class="mx-auto">
                        <input class=" " type="checkbox" name="pet_have[]" value="{{ $allone }}">
                        <p>{{ $allone }}</p>
                        <img src="/images/hero/{{ $allone }}.png" width="200">
                    </div>
                    @endforeach
                    </table>
                </div>
            </div>
        </div>
</div>
<!-- 第5格，隊伍 -->
<div id="tabs-5">
    <input type="hidden" name="id" value="{{ $list->id }}">
    <input type="hidden" name="account" value="{{ $list->account }}">
    {{ csrf_field() }}
    <div class="">
        <div class="text-center">取消勾選來刪除角色，最多選取4個角色</div>
        <div class="text-center">請注意!當隊伍選取到未持有角色時，並不會將此角色寫入隊伍裡</div>
        <br>
        <div class="col-10 overflow-auto mx-auto">

            @php
            $pet=explode("|", ($list->pet_team));
            $a=0;
            $b=0;
            @endphp
            <div class="row text-center mx-auto">
                @foreach($petallarry as $key=>$allone)
                @php $a=$b; @endphp
                @for($i = 0;$i < count($pet); $i ++) @if($allone==$pet[$i]) <div class="mx-auto">
                    <input type="checkbox" name="pet_team[]" value="{{ $allone }}" checked="checked">
                    <p>{{ $allone }}</p>
                    <img src="/images/hero/{{ $allone }}.png" width="200">
            </div>
            @php $a++; @endphp
            @endif
            @endfor

            @if($a != $b)
            @php continue; @endphp
            @endif
            <div class="mx-auto">
                <input type="checkbox" name="pet_team[]" value="{{ $allone }}">
                <p>{{ $allone }}</p>
                <img src="/images/hero/{{ $allone }}.png" width="200">
            </div>
            @endforeach
            </table>
        </div>
    </div>
</div>
</div>

</div>
<!-- 確定按鈕 -->
<div class="row">
    <button type="submit" class="btn btn-lg btn-primary mx-auto my-3">確 定</button>
</div>
</form>
</div>

<!-- 設置一個可以讓checkbox被鎖住的css，如果使用【prop("disabled", true)】，被鎖住的checkbox不會傳遞資料，就算已經被勾選的checkbox也不會傳遞資料。 -->
<style>
    .disabled-checkbox {
        opacity: 0.5;
        /* 設置透明 */
        pointer-events: none;
        /* 禁用滑鼠事件 */
    }
</style>

<script>
    $(function() {
        // # checkbox->name='pet_team[]'點選數量>=4個時，未被點選的會被鎖住，這個無法使用【.addClass("disabled-checkbox")】來寫出來
        // 檢查初始選中的checkbox數量，如果初始選中的數量大於等於4，則會禁用其他未被選中的checkbox
        var pet_team_hev = $("input[name='pet_team[]']:checked").length;
        if (pet_team_hev >= 4) {
            $("input[name='pet_team[]']").not(":checked").prop("disabled", true);
        }

        // checkbox點選後才會執行的判斷
        $("input[name='pet_team[]']").click(function() {
            var pet_team_hev = $("input[name='pet_team[]']:checked").length;

            if (pet_team_hev >= 4) {
                // not(":checked") : 未被點選的
                $("input[name='pet_team[]']").not(":checked").prop("disabled", true);
            } else {
                $("input[name='pet_team[]']").prop("disabled", false);
            }
        });

        // # checkbox->name='pet_team[]'點選數量=1個時，已被點選的會被鎖住
        // 檢查初始選中的checkbox數量，如果初始選中的數量等於1，則會鎖住被選中的checkbox
        var pet_team_low = $("input[name='pet_team[]']:checked").length;
        if (pet_team_low === 1) {
            $("input[name='pet_team[]']:checked").not(clickedCheckbox).addClass("disabled-checkbox");
        }
        // checkbox點選後才會執行的判斷
        $("input[name='pet_team[]']").click(function() {
            var pet_team_low = $("input[name='pet_team[]']:checked").length;
            if (pet_team_low === 1) {
                $("input[name='pet_team[]']:checked").not($(this)).addClass("disabled-checkbox");
            } else {
                $("input[name='pet_team[]']").removeClass("disabled-checkbox");
            }
        });

        // # checkbox->name='pet_have[]'點選數量=1個時，已被點選的會被鎖住
        // 檢查初始選中的checkbox數量，如果初始選中的數量等於1，則會鎖住被選中的checkbox
        var pet_have_low = $("input[name='pet_have[]']:checked").length;
        if (pet_have_low === 1) {
            $("input[name='pet_have[]']:checked").not(clickedCheckbox).addClass("disabled-checkbox");
        }
        // checkbox點選後才會執行的判斷
        $("input[name='pet_have[]']").click(function() {
            var pet_have_low = $("input[name='pet_have[]']:checked").length;
            if (pet_have_low === 1) {
                $("input[name='pet_have[]']:checked").not($(this)).addClass("disabled-checkbox");
            } else {
                $("input[name='pet_have[]']").removeClass("disabled-checkbox");
            }
        });

        // # 限制input的text類型的長度和只能輸入數字和英文
        // querySelector("#myInput") - 【myInput】 為id
        // querySelector("input[name='myInput']") - 要用name的話要寫【input[name='myInput']】
        // document.querySelector("#input1").addEventListener("input", function(event) {
        //     var maxLength = 16; // 獲取最大長度
        //     var inputValue = this.value; // 獲取輸入值

        //     var regex = /^[a-zA-Z0-9]+$/;
        //     // !regex.test(inputValue) : 當輸入值不為英文或數字，為true
        //     if (!regex.test(inputValue) || inputValue.length > maxLength) {
        //         // 截斷輸入值
        //         this.value = inputValue.replace(/[^a-zA-Z0-9]/g, '').slice(0, maxLength);
        //     }
        // });

    });
</script>

@endsection