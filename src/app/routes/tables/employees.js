const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

router.put('/table/employees', async (req, res) => {
    const employee = req.body
    console.log(employee.experience);
    if (!(employee.job_title && employee.full_name)) {
        return res.status(400).json({ message:'Bad request: empty job title or full name' })
    }
    try {
        await DBQuery(`INSERT INTO employees (
            job_title,
            full_name,
            DOB,
            hiring_date,
            experience,
            academic_degree,
            education
        ) VALUES (
             '${employee.job_title}', 
             '${employee.full_name}',          
             '${employee.dob}',  
             '${employee.hiring_date}',          
             '${employee.experience}',   
             '${employee.academic_degree}',     
             '${employee.education}'         
                 );
        `)
        res.status(200).json({ message: 'Success' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/table/employees', async (req, res) => {
    const employee = req.body
    console.log(employee.experience);
    if (!(employee.job_title && employee.full_name)) {
        return res.status(400).json({ message:'Bad request: empty job title or full name' })
    }
    try {
        await DBQuery(`UPDATE employees
            SET 
                job_title = '${employee.job_title || ''}',
                full_name = '${employee.full_name || ''}',
                DOB = '${employee.dob || ''}',
                hiring_date = '${employee.hiring_date || ''}',
                experience = '${employee.experience.years} years',
                academic_degree = '${employee.academic_degree || ''}',
                education = '${employee.education || ''}'
            WHERE 
                employee_id = ${employee.employee_id}; 
        `)
        res.status(200).json({message:'Success'})
        console.log('success patch' + 'employee');
    } catch (err) {
        res.status(500).json({message:err.message});
        console.log(err)
    }
});

router.delete('/table/employees', async (req, res) => {
    const employee_id = req.body.employee_id
    if (isNaN(employee_id)) {
        return res.status(400).json({ message:'Bad request'})
    }
    try {
        await DBQuery(`DELETE FROM employees WHERE employee_id = ${employee_id};`)
        res.status(200).json({ message:'Success'})
        console.log('success delete' + employee_id);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});
module.exports = router;