const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'disciplines_and_specialties';

router.put(`/table/${tableName}`, async (req, res) => {
    const record = req.body
    if (!(record.discipline_id) || !(record.specialty_id)) {
        return res.status(400).json({ message:'Bad request: empty employee or specialty' })
    }
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            discipline_id,
            specialty_id
        ) VALUES (
                         '${record.discipline_id}',
                         '${record.specialty_id}');
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