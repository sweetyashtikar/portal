const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
var cors = require('cors')
const app=express();
const student=require ('./RestAPI_Model/StudentApi');
const employee=require('./RestAPI_Model/EmployeAPI');
const installment = require('./RestAPI_Model/Installment')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});


app.use('/students', student);
app.use('/employees', employee);
app.use('/installments',installment);