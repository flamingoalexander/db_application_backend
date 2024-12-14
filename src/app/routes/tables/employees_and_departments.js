const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'employees_and_departments';

router.put(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    if (!(record.employee_id) || !(record.department_id)) {
        return res.status(400).json({ message:'Bad request: empty employee or department' })
    }
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            employee_id,
            department_id
        ) VALUES (
                         '${record.employee_id}',
                         '${record.department_id}');
        `)
        res.status(200).json({message:'Success'})
    } catch (err) {
        // if (err.message.startsWith('invalid input value for enum department_type_enum:')) {
        //     return res.status(400).json({ message:'Bad request: wrong department type' });
        // }
        res.status(500).json({message: err.message});
        console.log(err)
    }
});
router.delete(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    console.log(record);
    if (!(record.employee_id) || !(record.department_id)) {
        return res.status(400).json({ message:'Bad request: empty employee_id or department_id' })
    }
    try {
        await DBQuery(`DELETE FROM ${tableName} WHERE employee_id = ${record.employee_id} AND department_id = ${record.department_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete employees_and_departments');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;