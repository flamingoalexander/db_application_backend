const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());

const client = new Client({
    user: 'username',       // Замените на ваше имя пользователя PostgreSQL
    host: 'ipaddress',      // Замените на хост вашей базы данных
    database: 'postgres',       // Замените на имя вашей базы данных
    password: 'passwd',   // Замените на ваш пароль
    port: 228,             // Замените на порт вашей базы данных, если отличается
});

client.connect();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // В реальном приложении лучше указать конкретный источник
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

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
