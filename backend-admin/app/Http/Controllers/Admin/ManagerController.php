<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Manager;
use App\Models\Admin\UserPet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use IntlChar;

class ManagerController extends Controller
{
    public function list()
    {
        $list = Manager::get();

        $userid = 2;
        $pet = (new Manager())->getPet($userid);

        return view("admin.manager.list", compact("list", "pet", "userid"));
    }

    public function add()
    {
        // $list = Manager::all();
        $petallarry = "001|002|003|004|005|006|007|008|009";
        return view("admin.manager.add", compact("petallarry"));
    }

    public function edit(Request $req)
    {
        $list = Manager::find($req->id);
        // 持有的角色
        $pet1 = (new Manager())->getPet($req->id);
        // 改變成陣列
        $pet_have = explode(",", $pet1);
        // dd($pet_have);

        // 所有的角色
        $petallarry = (new Manager())->getPetAll();
        // dd($petallarry);

        return view("admin.manager.edit", compact("list", "pet_have", "petallarry"));
    }

    public function insert(Request $req)
    {
        // dd($req->account);
        $msg = ($req->account) . "已更新";
        $pet = implode("|", $req->pet_team);

        $manager = new Manager();

        try {
            $manager = new Manager();
            // $req->id: 裡面的id-為元件的name叫id，拿取裡面的內容
            $manager->account = $req->account;
            $manager->password = $req->password;
            $manager->username = $req->username;
            $manager->rank = $req->rank;
            $manager->experience = ($req->rank) * 100;
            $manager->money = $req->money;
            $manager->credit = $req->credit;
            $manager->pet_team = $pet;
            $manager->items = "001,20|002,10|004,10";
            $manager->save();
        } catch (Exception $e) {
            $msg = "更新失敗";
            throw $e;
        }

        Session::flash("/message", $msg);

        return redirect("/manager"); //去分頁
    }

    public function update(Request $req)
    {
        $manager = Manager::find($req->id);
        // 將陣列轉為文字
        $pet = implode("|", $req->pet_team);

        $msg = ($manager->account) . "已更新";
        try {
            // $req->id: 裡面的id-為元件的name叫id，拿取裡面的內容
            $manager->password = $req->password;
            $manager->username = $req->username;
            $manager->rank = $req->rank;
            $manager->experience = ($manager->experience) % 100 + ($req->rank) * 100;
            $manager->money = $req->money;
            $manager->credit = $req->credit;

            // 處理持有角色
            $pet_have_var = implode(",", $req->pet_have);
            // dd($req->pet_have);
            // dd($pet_have_var);
            // dd($req->account);
            (new UserPet())->delete_userpet($req->account, $pet_have_var);
            foreach ($req->pet_have as $item) {
                // dd($item);
                (new UserPet())->add_UserPet($req->id, $item, '100');
            }

            // 處理角色隊伍
            $pet_team_have=[];
            foreach ($req->pet_have as $item1) {
                foreach ($req->pet_team as $item2) 
                {
                    if($item1==$item2)
                    {
                        $pet_team_have[]=$item2;
                    }
                }
            }
            $pet_team_var = implode("|", $pet_team_have);
            $manager->pet_team = $pet_team_var;
            // dd($pet_team_var);
            $manager->save();
        } catch (Exception $e) {
            $msg = "更新失敗";
            throw $e;
        }

        Session::flash("message", $msg);
        // return redirect()->back();
        return redirect("/manager"); //去分頁
    }

    public function team(Request $req)
    {
        // 持有的角色
        $pet1 = (new Manager())->getPet($req->id);
        // 改變成陣列
        $pet_have = explode(",", $pet1);
        // dd($pet_have);

        // 所有的角色
        $petallarry = (new Manager())->getPetAll();
        // dd($petallarry);
        return view("admin.manager.edit", compact("list", "pet_have", "petallarry"));
    }

    public function team_update(Request $req)
    {
        //
    }

    public function delete(Request $req)
    {
        $msg = '刪除出現錯誤';
        // dd($req->id);
        if (!empty($req->id)) {
            // 刪除持有角色
            (new Manager())->delete_userpet($req->id);
            // 刪除帳號
            Manager::destroy($req->id);
            $msg = '刪除成功';
        }

        Session::flash("message", $msg);
        return redirect("manager");
    }
}
