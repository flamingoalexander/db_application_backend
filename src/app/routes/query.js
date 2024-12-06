const express = require('express');
const { DBQuery } = require('@/services/database');

const router = express.Router();

router.post('/query', async (req, res) => {
    const sqlQuery = req.body.query;
    try {
        const result = await DBQuery(sqlQuery);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

module.exports = router;