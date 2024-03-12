//所需的npm包
const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const pets_card = {}
//db連線程序設定
const connection = mysql.createConnection({
    // host: 'localhost',
    host: 'db',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'projectb'
})

//連線db
connection.connect((err) => {
    if (err) {
        console.error('Error connection to database: ', err);
        return
    }
    console.log('Connected to database successfully');

    //抓取寵物總表
    connection.query('SELECT * FROM pets_card', (error, results, fields) => {
        if (error) {
            console.error('Error querying pet_cart: ', error);
            return;
        }
        // 結果

        results.forEach(element => {
            const { id, ...petInfo } = element
            pets_card[id] = petInfo
        });

        // console.log('Pet cart data:', pets_card);
    })
});



app.use(cors())
app.use(bodyParser.json());

//確認server是否存活
app.get('/', (req, res) => {
    res.json({ message: 'API server is living' })
});

//使用者登入
app.post('/userLogin', (req, res) => {
    const { account, password } = req.body;

    //檢查帳號是否存在以及密碼是否正確
    connection.query('SELECT * FROM user_account WHERE account = ?', [account], (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error);
            res.json({ message: '未知錯誤' })
        }
        //檢查用戶是否存在或者密碼錯誤
        if (results.length > 0 && password == results[0].password) {

            //抓取使用者寵物資訊
            connection.query('SELECT * FROM user_pets WHERE user_account = ?', [results[0].id], (error, pets) => {
                let userpets = {}
                pets.forEach(pet => {
                    const petnow = pets_card[pet['pet_number']]
                    const petexp = pet['experience']

                    //計算寵物目前能力
                    const lv = [petexp / 100, petexp % 100]
                    const hp = petnow.health_point + (petnow.health_point_coefficient * lv[0])
                    const atk = petnow.attack + (petnow.attack_coefficient * lv[0])
                    const cover = petnow.resilience + (petnow.resilience_coefficient * lv[0])
                    console.log(hp);
                    userpets[petnow['number']] = { 'name': petnow.name, 'story': petnow.story, 'attribute': petnow.element_attributes, 'level': lv, 'health': hp, 'attack': atk, 'cover': cover }

                });

                const userData = { ...results[0], userpets, message: '登入成功' }
                console.log(userpets);
                console.log(userData);
                res.json(userData)
            })


        } else {
            res.json({ message: '帳號或密碼錯誤' })
        }

    })

});

//註冊使用者
app.post('/userCreate', (req, res) => {
    const { account, password, username } = req.body;

    //檢查帳號是否存在
    connection.query('SELECT COUNT(*) AS count FROM user_account WHERE account = ?', [account], (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error)
            return res.json({ message: '發生異常錯誤，帳號無法創建。' });
        }
        if (results[0].count > 0) {
            return res.json({ message: '該帳號已有人使用' })
        } else {
            //新增帳號
            //預設新帳號內容物
            const newAccountContain = {
                account,
                password,
                username,
                rank: 1,
                money: 1000,
                credit: 500,
                experience: 100,
                pet_team: "001|002|003",
                items: "001,20|002,10|004,10"
            }

            const insertQuery = 'INSERT INTO user_account SET ?';

            connection.query(insertQuery, newAccountContain, (error, results) => {
                if (error) {
                    console.error('Error insert data', error);
                    return res.json({ message: '帳號創建失敗' })
                }
                console.log(results.insertId);
                console.log('Data inserted successfully');

                //插入使用者寵物資料
                const petData = [
                    { user_account: results.insertId, pet_number: 1, experience: '100' },
                    { user_account: results.insertId, pet_number: 2, experience: '100' },
                    { user_account: results.insertId, pet_number: 5, experience: '100' }
                ];

                const insertQuery = `INSERT INTO user_pets (user_account,pet_number,experience) VALUES ?`;
                connection.query(insertQuery, [petData.map(item => [item.user_account, item.pet_number, item.experience])], (Error, Results, Fields) => {
                    if (Error) {
                        console.error('Error inserting data:', insertError);
                        res.status(500).send('寵物資料創建失敗異常錯誤');
                        return;
                    }
                });
                return res.json({ message: '帳號創建完成' })
            })


        }
    })



});

//使用者帳號刪除
app.post('/userDelete', (req, res) => {
    const { account } = req.body;
    connection.query('SELECT * FROM user_account WHERE account=?', [account], (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error);
            return res.json({ message: '發生異常錯誤，帳號無法刪除。' });
        }

        //檢查用戶是否存在
        if (results.length == 0) {
            return res.json({ message: '該用戶不存在' })
        } else {

            connection.query('DELETE FROM user_account WHERE account=?', [account], (error, results) => {
                if (error) {
                    console.error('錯誤查詢:', error)
                    return res.json({ message: '發生異常錯誤，帳號無法刪除。' });
                } else {
                    console.log('Data deleted successfully');
                    return res.json({ message: '帳號' + account + '已刪除' })
                }
            })
        }


    })

});

// 使用者資料更新
app.post('/userUpdate', (req, res) => {
    //檢查是否有更新經驗
    if (req.body.hasOwnProperty('addexp')) {
        req.body.experience = parseInt(req.body.addexp) + parseInt(req.body.experience)
        delete req.body.addexp
    }
    //檢查是否有更新道具
    if (req.body.hasOwnProperty('additems')) {
        let items = {}
        req.body.items.split("|").forEach(pair => {
            let [key, value] = pair.split(',');
            items[key] = parseInt(value)
        });
        items[req.body.additems[0]] += req.body.additems[1]
        let itemsStr = Object.entries(items).map(([key, value]) => key + ',' + value).join("|")
        delete req.body.additems, req.body.items;
        req.body.items = itemsStr


    }
    const { account, ...updates } = req.body;//提取account將剩下的存到updates
    connection.query('SELECT * FROM user_account WHERE account=?', [account], (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error);
            return res.json({ message: '發生異常錯誤，帳號無法更新。' });
        }

        //檢查用戶是否存在
        if (results.length == 0) {
            return res.json({ message: '該用戶不存在' })
        } else {

            connection.query('UPDATE user_account SET ? WHERE account = ?', [updates, account], (error, results) => {
                if (error) {
                    console.error('錯誤查詢:', error)
                    return res.json({ message: '發生異常錯誤，帳號無法更新，請確認格式是否正確。' });
                } else {
                    console.log('Update successfully');
                    return res.json({ message: '帳號' + account + '更新完成' })
                }
            })
        }


    })
})

// 使用者列表
app.get('/userList', (req, res) => {
    connection.query('SELECT * FROM user_account', (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error);
            return res.json({ message: '發生異常錯誤，帳號無法更新。' });
        }

        const userData = {}
        results.forEach(element => {
            delete element.id
            userData[element.account] = element
        });

        // console.log(userData);
        return res.json(userData)
    })
});

//使用者寵物經驗更新
app.post('/petUpdate', (req, res) => {
    const { account, ...updates } = req.body;
    let userdata = {};

    connection.query('SELECT * FROM user_account WHERE account=?', [account], (error, user) => {
        if (error) {
            console.error('錯誤查詢:', error);
            res.json({ message: '發生異常錯誤，使用者寵物經驗無法更新。' });
        }

        if (user.length == 0) {
            return res.json({ message: '該用戶不存在' })
        } else {
            //果實數量更新

            let items = {}
            user[0].items.split("|").forEach(pair => {
                let [key, value] = pair.split(',');
                items[key] = parseInt(value)
            });
            console.log(items);
            items[updates.itemnumber] -= updates.itemamount
            console.log(items);
            let itemsStr = Object.entries(items).map(([key, value]) => key + ',' + value).join("|")
            console.log(itemsStr);

            connection.query('UPDATE user_account SET items = ? WHERE account = ?', [itemsStr, user[0].account], (error, results) => {
                if (error) {
                    console.error('錯誤查詢:', error);
                    res.json({ message: '發生異常錯誤，使用者道具無法更新。' });
                }

                console.log('更新完成', results);
            })

            //使用者寵物經驗更新

            let upexp = updates.itemamount * 80

            connection.query('UPDATE user_pets SET experience = experience + ? WHERE user_account = ? AND pet_number = ? ', [upexp, user[0].id, updates.petnumber], (error, results) => {
                if (error) {
                    console.error('錯誤查詢:', error);
                    res.json({ message: '發生異常錯誤，使用者寵物經驗無法更新。' });
                }

                connection.query('SELECT * FROM user_pets WHERE user_account = ? AND pet_number = ?', [user[0].id, updates.petnumber], (error, results) => {

                    console.log('使用者寵物經驗更新完成', results);
                    res.json({ message: '寵物經驗更新完成', items: itemsStr, exp: results[0].experience })
                })
            })





        }
    })



});


//監聽
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
