const express = require('express');
const { DBQuery } = require('@/services/database')
const { generateRandomString } = require('@/utils/ctypto')

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(password, username);
    try {
        const userResult = await DBQuery(
            'SELECT passwd, user_id FROM users WHERE username = $1 LIMIT 1;',
            [username]
        );
        if (userResult.rowCount > 0) {
            const userPasswd = userResult.rows[0].passwd;
            if (userPasswd === password) {
                const sessionToken = generateRandomString();
                const user_id = userResult.rows[0].user_id;
                await DBQuery(
                    `INSERT INTO active_sessions (user_id, session_token) VALUES (${user_id}, '${sessionToken}');`
                );
                res.status(200).json({
                    message: 'Login successful',
                    token: sessionToken,
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
});

router.post('/logout', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (token) {
            await DBQuery(
                `DELETE FROM active_sessions WHERE session_token = '${token}';`
            );
            res.status(200).json({
                message: 'Successful logout',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
