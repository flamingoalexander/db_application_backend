const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'phone_numbers';

router.put(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    if (!(record.employee_id) || !(record.phone_number)) {
        return res.status(400).json({ message:'Bad request: empty department name' })
    }
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            phone_number,
            employee_id
        ) VALUES (
             '${record.phone_number}', 
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
//     const record = req.body
//     if (!(record.phone_number) || !(record.employee_id)) {
//         return res.status(400).json({ message:'Bad request: empty phone_number or employee_id' })
//     }
//     try {
//         await DBQuery(`UPDATE ${tableName}
//             SET
//                 phone_number = '${record.phone_number}',
//                 employee_id = '${department.department_type}'
//             WHERE
//                 employee_id = ${record.employee_id};
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

router.delete(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    console.log(record);
    if (!(record.phone_number) || !(record.employee_id)) {
        return res.status(400).json({ message:'Bad request: empty phone_number or employee_id' })
    }
    try {
        await DBQuery(`DELETE FROM ${tableName} WHERE phone_number = ${record.phone_number} AND employee_id = ${record.employee_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete phone number');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;