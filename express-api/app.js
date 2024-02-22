//所需的npm包
const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');

const app = express();

//db連線程序設定
const connection = mysql.createConnection({
    host: 'localhost',
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
})

app.use(bodyParser.json());

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

        }
        //檢查用戶是否存在或者密碼錯誤
        if (results.length > 0 && password == results[0].password) {
            res.json(results)
        } else {
            res.json({ message: '帳號或密碼錯誤' })
        }

    })

});

//註冊使用者
app.post('/userCreate', (req, res) => {
    const { account, password, username } = req.body;

    //檢查帳號是否存在
    connection.query('SELECT * FROM user_account WHERE account = ?', [account], (error, results) => {
        if (error) {
            console.error('錯誤查詢:', error)
            return res.json({ message: '發生異常錯誤，帳號無法創建。' });
        }
        if (results.length > 0) {
            return res.json({ message: '該帳號已有人使用' })
        } else {//新增帳號

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
            const insertValues = [JSON.stringify(newAccountContain)]

            connection.query(insertQuery, newAccountContain, (error, results) => {
                if (error) {
                    console.error('Error insert data', error);
                    return res.json({ message: '帳號創建失敗' })
                }
                console.log('Data inserted successfully');
                return res.json({ message: '帳號創建完成' })
            })

            // const addUser = 'INSERT INTO user_account (account,password) VALUES (?,?)'
            // const values = [account,password]

        }
    })



})


//監聽
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
