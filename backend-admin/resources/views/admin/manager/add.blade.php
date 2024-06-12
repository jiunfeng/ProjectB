@extends("admin.app")
@section("title","會員新增")
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
        <li><a href="#tabs-1">帳號、密碼、名字、等級、錢、經驗</a></li>
        <li><a href="#tabs-2">初始角色</a></li>
    </ul>
    <form method="post" action="/manager/insert" enctype="multipart/form-data">
        <!-- 第1格，帳號、密碼、名字、等級、錢、經驗 -->
        <div id="tabs-1">
            {{ csrf_field() }}
            <div class="row">
                <div class="col-1 text-right">帳號</div>
                <div class="col-6">
                    <input type="text" name="account" class="form-control" value="" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">密碼</div>
                <div class="col-6">
                    <input type="text" name="password" class="form-control" value="" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">名字</div>
                <div class="col-6">
                    <input type="text" name="username" class="form-control" value="" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">等級</div>
                <div class="col-6">
                    <input type="text" name="rank" class="form-control" value="3" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">錢</div>
                <div class="col-6">
                    <input type="text" name="money" class="form-control" value="5000" required>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-right">經驗</div>
                <div class="col-6">
                    <input type="text" name="credit" class="form-control" value="3000" required>
                </div>
            </div>
        </div>
        <!-- 第2格，初始角色 -->
        <div id="tabs-2">
            {{ csrf_field() }}
            <div class="">
                <div class="text-center">取消勾選來刪除角色</div>
                <br>
                <div class="col-10 overflow-auto mx-auto">
                    @php
                    $petall=explode("|", ($petallarry));
                    @endphp
                    <div class="row text-center mx-auto">
                        @foreach($petall as $allone)
                        @if($allone == "001" || $allone == "002" || $allone == "003")
                        <div class="mx-auto">
                            <input type="checkbox" name="pet_team[]" value="{{ $allone }}" checked="checked">
                            <p>{{ $allone }}</p>
                            <img src="/images/hero/{{ $allone }}.png" width="200">
                        </div>
                        @else
                        <div class="mx-auto">
                            <input type="checkbox" name="pet_team[]" value="{{ $allone }}">
                            <p>{{ $allone }}</p>
                            <img src="/images/hero/{{ $allone }}.png" width="200">
                        </div>
                        @endif
                        @endforeach
                    </div>
                    </table>
                </div>
            </div>
        </div>
        <!-- 確定按鈕 -->
        <div class="row">
            <button type="submit" class="btn btn-lg btn-primary mx-auto">確 定</button>
            <br>
            <br>
        </div>
    </form>
</div>
@endsection