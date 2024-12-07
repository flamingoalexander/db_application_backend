const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'disciplines';

router.put(`/table/${tableName}`, async (req, res) => {
    const discipline = req.body.discipline
    try {
        DBQuery(`INSERT INTO ${tableName} (
            discipline_name,
            discipline_type
        ) VALUES (
             '${discipline.discipline_name}', 
             '${discipline.discipline_type}');
        `)
        res.status(200).json({message:'Success'})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.patch('/table/disciplines', async (req, res) => {
    const discipline = req.body.discipline
    try {
        DBQuery(`UPDATE ${tableName}
            SET
                discipline_name = '${discipline.discipline_name}',
                discipline_type = '${discipline.discipline_type}'
            WHERE 
                discipline_id = ${discipline.discipline_id}; 
        `)
        res.status(200).json({message:'Success'})
        console.log('success patch' + discipline);
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err)
    }
});

router.delete('/table/disciplines', async (req, res) => {
    const discipline_id = req.body.discipline.discipline_id
    try {
        DBQuery(`DELETE FROM employees WHERE employee_id = ${discipline_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete' + discipline_id);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;