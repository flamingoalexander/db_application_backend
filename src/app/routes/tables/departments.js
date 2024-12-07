const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'departments';

router.put(`/table/${tableName}`, async (req, res) => {
    const department = req.body
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            department_name,
            department_type
        ) VALUES (
             '${department.department_name}', 
             '${department.department_type}');
        `)
        res.status(200).json({message:'Success'})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.patch(`/table/${tableName}`, async (req, res) => {
    const department = req.body
    console.log(12768763);
    console.log(req.body);
    try {
        await DBQuery(`UPDATE ${tableName}
            SET
                department_name = '${department.department_name}',
                department_type = '${department.department_type}'
            WHERE
                department_id = ${department.department_id}; 
        `)
        res.status(200).json({message:'Success'})
        console.log('success patch' + department);
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err)
    }
});

router.delete(`/table/${tableName}`, async (req, res) => {
    const department_id = req.body.department_id
    try {
        await DBQuery(`DELETE FROM ${tableName} WHERE department_id = ${department_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete' + department_id);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;