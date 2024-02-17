
const express = require('express');

const app = express();

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.json(user); // 返回用户数据
    } else {
        res.status(404).json({ error: 'User not found' }); // 返回用户不存在的错误
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
