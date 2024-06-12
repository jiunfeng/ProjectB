@extends("admin.app")
@section("title","會員管理")
@section("content")
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <a class="btn btn-info" href="manager/add">新增</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="btn btn-danger" href="javascript:deleteAll()">刪除</a>
            </div>
        </div>
        <div class="mx-2">
            <form method="post" action="delete" name="list">
                {{ csrf_field() }}
                <table class="table table-bordered">
                    <tr style="background-color: #f5f3da;">
                        <th class="text-center">
                            <input type="checkbox" class="form-check-input translate-middle-x mx-auto" id="all">
                        </th>
                        <th class="text-center">帳號</th>
                        <th class="text-center">密碼</th>
                        <th class="text-center">使用者名字</th>
                        <th class="text-center">等級</th>
                        <th class="text-center">錢</th>
                        <th class="text-center">經驗</th>
                        <th class="text-center">持有角色</th>
                        <th class="text-center">隊伍</th>
                        <td class="text-center">修改</td>
                    </tr>
                    @foreach($list as $data)
                    @php
                    $manager = new \App\Models\Admin\Manager();
                    $pet1 = $manager->getPet($data->id);
                    @endphp
                    <tr>
                        <td class="text-center">
                            <input type="checkbox" class="chk form-check-input translate-middle-x mx-auto" name="id[]" value="{{ $data->id }}">
                        </td>
                        <td class="text-center">{{ $data->account }}</td>
                        <td class="text-center">{{ $data->password }}</td>
                        <td class="text-center">{{ $data->username }}</td>
                        <td class="text-center">{{ $data->rank }}</td>
                        <td class="text-center">{{ $data->money }}</td>
                        <td class="text-center">{{ $data->credit }}</td>
                        <td class="text-center">{{ $pet1 }}</td>
                        <td class="text-center">{{ $data->pet_team }}</td>
                        <td class="text-center"><a href="manager/edit/{{ $data->id }}" class="btn btn-success">修改</a></td>
                    </tr>
                    @endforeach
                </table>
            </form>
        </div>
    </div>
</div>
@endsection