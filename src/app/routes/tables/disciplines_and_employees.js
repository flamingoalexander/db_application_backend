const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'disciplines_and_employees';

router.put(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    if (!(record.discipline_id) || !(record.employee_id)) {
        return res.status(400).json({ message:'Bad request: empty employee or discipline' })
    }
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            discipline_id,
            employee_id
        ) VALUES (
             '${record.discipline_id}', 
             '${record.employee_id}');
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

// router.patch(`/table/${tableName}`, async (req, res) => {
//     const department = req.body
//     if (!(department.department_name)) {
//         return res.status(400).json({ message:'Bad request: empty department name' })
//     }
//     try {
//         await DBQuery(`UPDATE ${tableName}
//             SET
//                 department_name = '${department.department_name}',
//                 department_type = '${department.department_type}'
//             WHERE
//                 department_id = ${department.department_id};
//         `)
//         res.status(200).json({message:'Success'})
//         console.log('success patch' + department);
//     } catch (err) {
//         if (err.message.startsWith('invalid input value for enum department_type_enum:')) {
//             return res.status(400).json({ message:'Bad request: wrong department type' });
//         }
//         res.status(500).json({message:err.message});
//         console.log(err)
//     }
// });
//


router.delete(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    console.log(record);
    if (!(record.discipline_id) || !(record.employee_id)) {
        return res.status(400).json({ message:'Bad request: empty employee_id or department_id' })
    }
    try {
        await DBQuery(`DELETE FROM ${tableName} WHERE discipline_id = ${record.discipline_id} AND discipline_id = ${record.discipline_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete employees_and_departments');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;