const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const router = express.Router();
const autoIncrement = require('mongoose-auto-increment');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/CRM_Database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  occupation: String,
  salary: Number,
  age: Number
});
const Employee = mongoose.model('Employee', employeeSchema);

// Routes
// Create Employee
router.post('/', async (req, res) => {
  try {
    const { name, email, password, occupation, salary, age } = req.body;
    const employee = new Employee({ name, email, password, occupation, salary, age });
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.json(employee);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Employee
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, occupation, salary, age } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, password, occupation, salary, age }, { new: true });
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.json(employee);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports=router;