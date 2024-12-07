const express = require('express');
const { DBQuery } = require('@/services/database')
const { generateRandomString } = require('@/utils/ctypto')

const router = express.Router();
const TABLE_RIGHTS = {
    admin: ['employees', 'phone_numbers', 'employees_and_departments',
        'disciplines', 'disciplines_and_specialties', 'specialties',
        'disciplines_and_employees', 'departments' ],
    secretary: ['disciplines_and_employees'],
    ED: ['disciplines', 'disciplines_and_specialties', 'specialties'],
    HR: ['employees', 'phone_numbers', 'employees_and_departments'],
}
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(password, username);
    try {
        const result = await DBQuery(
            'SELECT passwd, user_id, rights FROM users WHERE username = $1 LIMIT 1;',
            [username]
        );
        if (result.rowCount > 0) {
            const user = result.rows[0];
            const userPasswd = user.passwd;
            if (userPasswd === password) {
                const sessionToken = generateRandomString();
                const user_id = user.user_id;
                const userRights = user.rights;
                console.log(TABLE_RIGHTS[userRights]);
                await DBQuery(
                    `INSERT INTO active_sessions (user_id, session_token) VALUES (${user_id}, '${sessionToken}');`
                );
                console.log(userRights)
                res.status(200).json({
                    message: 'Login successful',
                    token: sessionToken,
                    rights: TABLE_RIGHTS[userRights]
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
