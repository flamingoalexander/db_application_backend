const express = require('express');


const cors = require('@/app/middlewares/cors');
const authMiddleware = require('@/app/middlewares/auth');
const authRoutes = require('@/app/routes/auth');
const employeesApi = require('@/app/routes/tables/employees')
const disciplinesApi = require('@/app/routes/tables/disciplines')
const departmentsApi = require('@/app/routes/tables/departments')
const specialtiesApi = require('@/app/routes/tables/specialties')
const phoneNumbersApi = require('@/app/routes/tables/phone_numbers')
const disciplines_and_employeesApi = require('@/app/routes/tables/disciplines_and_employees')
const disciplines_and_specialtiesApi = require('@/app/routes/tables/disciplines_and_specialties')
const employees_and_departmentsApi = require('@/app/routes/tables/employees_and_departments')
const queryRoutes = require('@/app/routes/query');

const app = express();


app.use(express.json());

app.use(cors);

app.use('/api', authRoutes);

app.use('/api', authMiddleware);
app.use('/api', employeesApi);
app.use('/api', disciplinesApi);
app.use('/api', departmentsApi);
app.use('/api', specialtiesApi);
app.use('/api', phoneNumbersApi);

app.use('/api', disciplines_and_employeesApi);

app.use('/api', disciplines_and_specialtiesApi);

app.use('/api', employees_and_departmentsApi);

app.use('/api', queryRoutes);

module.exports = app;