const express = require('express');


const cors = require('@/app/middlewares/cors');
const authMiddleware = require('@/app/middlewares/auth');
const authRoutes = require('@/app/routes/auth');
const employeesApi = require('@/app/routes/tables/employees')
const queryRoutes = require('@/app/routes/query');

const app = express();


app.use(express.json());

app.use(cors);

app.use('/api', authRoutes);

app.use('/api', authMiddleware);
app.use('/api', employeesApi);
app.use('/api', queryRoutes);

module.exports = app;