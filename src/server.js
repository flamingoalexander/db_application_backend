const express = require('express');
const { Client } = require('pg');
const crypto = require('crypto');
require('dotenv').config()

const app = express();
app.use(express.json());

const client = new Client({
    user: process.env.POSTGRES_USER,       // Замените на ваше имя пользователя PostgreSQL
    host: process.env.POSTGRES_HOST,  // Замените на хост вашей базы данных
    database: process.env.POSTGRES_DB,       // Замените на имя вашей базы данных
    password: process.env.POSTGRES_PASSWORD,   // Замените на ваш пароль
    port: 5432,             // Замените на порт вашей базы данных, если отличается
});

client.connect();

function generateRandomString() {
    return crypto.createHash('sha256') // Выбираем алгоритм хэширования
        .update(crypto.randomBytes(64)) // Генерируем случайные данные
        .digest('hex') // Преобразуем в строку
        .slice(0, 64); // Обрезаем до 64 символов (если нужно)
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // В реальном приложении лучше указать конкретный источник
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(123);
    // console.log(username, password);
    // console.log(req.body);
    try {
        const userResult = await client.query(
            'SELECT passwd, user_id FROM users WHERE username = $1 LIMIT 1;',
            [username]
        );
        console.log(userResult);
        if (userResult.rowCount > 0) {
            const userPasswd = userResult.rows[0].passwd;
            if (userPasswd === password) {
                const sessionToken = generateRandomString();
                const user_id = userResult.rows[0].user_id;
                console.log(123);
                console.log(user_id);
                await client.query(
                    `INSERT INTO actives_sessions (user_id, session_token) VALUES (${user_id}, ${sessionToken});`
                );
                res.status(200).json({
                    message: 'Login successful',
                    token: userResult.rows[0].token,
                });
            } else {
                console.log('wrong paswd');
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log('user does not exist');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

})






app.post('/query', async (req, res) => {
    const sqlQuery = req.body.query;
    try {
        const result = await client.query(sqlQuery);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
