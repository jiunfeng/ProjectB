<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

class Manager extends Model
{
    public $timestamps = false;
    // 資料表名稱
    protected $table = "user_account";
    // 主鍵
    protected $primaryKey = "id";
    // 欄位
    protected $fillable = [
        "id",
        "account",
        "password",
        "username",
        "rank",
        "money",
        "credit",
        "experience",
        "pet_team",
        "items",
        "background_pet",
        "heads"
    ];

    // 抓取使用者的持有角色
    public function getPet($id)
    {
        $data = DB::select("SELECT pets_card.number
        FROM user_account
        JOIN user_pets ON user_account.id = user_pets.user_account
        JOIN pets_card ON user_pets.pet_number = pets_card.id
        WHERE user_account.id = ?", [$id]);
        // dd($data);
        // 將資料表欄位裡的內容取出，並在每個數值中間加上【,】
        $pet1 = '';
        foreach ($data as $key => $item) {
            if ($key > 0) {
                $pet1 .= ',';
            }
            $pet1 .= $item->number;
        }

        // dd($pet1);
        return $pet1;
    }

    // 顯示pets_card.number(所有的角色)的代碼(number)資料
    public function getPetAll()
    {
        $data = DB::select("SELECT pets_card.number FROM pets_card");

        $allpet = array();
        foreach ($data as $item) {
            $allpet[] = $item->number;
        }

        return $allpet;
    }

    // 刪除帳號擁有的所有持有角色
    // $id= user_pets.user_account=user_account.id
    public function delete_userpet($id)
    {
        // 因傳進來的數是陣列，所以改成文字
        $userid = '';
        foreach ($id as $item) {
            $userid = $item;
        }
        // dd($userid);
        // 刪除
        DB::delete("DELETE FROM user_pets
        WHERE user_account= ?", [$userid]);
    }
}
