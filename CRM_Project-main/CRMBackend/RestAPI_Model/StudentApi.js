const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');

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

app.use(bodyParser.json());
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String
});

const Student = mongoose.model('Student', studentSchema);



//post
router.post('/', async (req, res) => {
  try {
    const { name, email, password, occupation, salary, age } = req.body;
    const students = new Student({ name, email, password, occupation, salary, age });
    await students.save();
    res.json(students);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve students' });
    }
  });


  // Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const students = await Student.findById(req.params.id);
    if (!students) {
      return res.status(404).send('Student not found');
    }
    res.json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update Students
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, occupation, salary, age } = req.body;
    const students = await Student.findByIdAndUpdate(req.params.id, { name, email, password, occupation, salary, age }, { new: true });
    if (!students) {
      return res.status(404).send('Student not found');
    }
    res.json(students);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Students
router.delete('/:id', async (req, res) => {
  try {
    const students = await Student.findByIdAndDelete(req.params.id);
    if (!students) {
      return res.status(404).send('Students not found');
    }
    res.json({ message: 'Students deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

  module.exports = router;