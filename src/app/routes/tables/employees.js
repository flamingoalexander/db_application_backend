const express = require('express');

const { DBQuery } = require('@/services/database');

const router = express.Router();

router.put('/table/employees', async (req, res) => {
    const employee = req.body.employee
    try {
        DBQuery(`INSERT INTO employees (
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
        res.status(200).send('Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.patch('/table/employees', async (req, res) => {
    const employee = req.body.employee
    try {
        DBQuery(`UPDATE employees
            SET 
                job_title = '${employee.job_title}',
                full_name = '${employee.full_name}',
                DOB = '${employee.dob}',
                hiring_date = '${employee.hiring_date}',
                experience = '${employee.experience}',
                academic_degree = '${employee.academic_degree}',
                education = '${employee.education}'
            WHERE 
                employee_id = ${employee.employee_id}; 
        `)
        res.status(200).send('Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.patch('/table/employees', async (req, res) => {
    const employee_id = req.body.employee_id
    try {
        DBQuery(`DELETE FROM employees WHERE employee_id = ${employee_id};`)
        res.status(200).send('Success');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router;