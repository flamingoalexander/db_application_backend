const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

client.connect();

module.exports = {
    DBQuery: (text, params) => client.query(text, params),
    getSession: (token) => client.query('SELECT * FROM active_sessions WHERE session_token = $1', [token]).then(res => res.rows[0]),
};