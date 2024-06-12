<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

class UserPet extends Model
{
    public $timestamps = false;
    // 資料表名稱
    protected $table = "user_pets";
    // 主鍵
    protected $primaryKey = "id";
    // 欄位
    protected $fillable = [
        "id",
        "user_account",
        "pet_number",
        "experience"
    ];

    public function delete_userpet($user, $pet)
    {
        // 功能: 合併3個資料表，尋找wher user_account.account=$user的pets_card.number的全部資料，且如果如果pets_card.number的數沒有在$pet裡面找到的話，刪除這行資料(但只刪除user_pets資料表的這筆資料，其他被合併的資料表不會被刪除到)
        // statement -> 安全性較高的寫法
        DB::statement("DELETE FROM user_pets
        WHERE user_pets.id IN (
            SELECT user_pets.id
            FROM user_pets
            JOIN user_account ON user_account.id = user_pets.user_account
            JOIN pets_card ON user_pets.pet_number = pets_card.id
            WHERE user_account.account = ? AND pets_card.number NOT IN ($pet)
            )", [$user]);
    }

    // 新增資料
    public function add_UserPet($userid, $pet, $experience)
    {
        // 功能: 使用$pet在pets_card資料表裡面找尋pets_card.id，因為user_pets.pet_number=pets_card.id
        $list = DB::select("SELECT id
        FROM pets_card
        WHERE number=?", [$pet]);
        $pet_number = '';
        foreach ($list as $item) {
            $pet_number = $item->id;
            // dd($pet_number);
        }

        // 新增資料
        // 功能: 合併資料表user_pets和pets_card，接下來指定user_account的數值並顯示全部資料出來，且如果pet_number的數值在指定後的資料表是有存在的，將不會執行新增動作，如果不存在，將會在user_pets資料表新增這行資料
        DB::insert("
        INSERT INTO user_pets (user_account, pet_number, experience)
        SELECT ?, ?, ?
        FROM dual
        WHERE NOT EXISTS (
        SELECT 1
        FROM user_pets
        WHERE user_account = ? AND pet_number = ?);",
        [$userid, $pet_number, $experience, $userid, $pet_number]);
    }
}
