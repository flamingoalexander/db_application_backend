const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

const tableName = 'specialties';

router.put(`/table/${tableName}`, async (req, res) => {
    const speciality = req.body
    try {
        await DBQuery(`INSERT INTO ${tableName} (
            speciality_cipher,
            speciality_name,
            speciality_ep_director
        ) VALUES (
             '${speciality.speciality_cipher}', 
             '${speciality.speciality_name}',
             '${speciality.speciality_ep_director}');
        `)
        res.status(200).json({message:'Success'})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.patch(`/table/${tableName}`, async (req, res) => {
    const speciality = req.body
    try {
        await DBQuery(`UPDATE ${tableName}
            SET
                speciality_cipher = '${speciality.speciality_cipher}',
                speciality_name = '${speciality.speciality_name}',
                speciality_ep_director = '${speciality.speciality_ep_director}'
            WHERE
                speciality_id = ${speciality.speciality_id}; 
        `)
        res.status(200).json({message:'Success'})
        console.log('success patch' + speciality);
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err)
    }
});

router.delete(`/table/${tableName}`, async (req, res) => {
    const speciality_id = req.body.speciality_id
    try {
        await DBQuery(`DELETE FROM ${tableName} WHERE department_id = ${speciality_id};`)
        res.status(200).json({message:'Success'})
        console.log('success delete' + speciality_id);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;