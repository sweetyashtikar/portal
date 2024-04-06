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
db.once('open', function () {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  installmentDates: {
    type: [Date]
  },
  installmentAmounts: {
    type: [Number]
  },
  paymentStatus: {
    type: [{
      installmentNumber: Number,
      status: { type: String, enum: ['Paid', 'Pending', 'Late'], default: 'Pending' }
    }]
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    }
  },
  // Add more fields as needed
});

const Payment = mongoose.model('Payment', paymentSchema);


router.post('/', async (req, res) => {
    try {
        const { name, course, startDate, contact, installmentAmounts } = req.body;
        // Calculate installment dates here based on course start date
        const installmentDates = calculateInstallmentDates(startDate);
    
        const payment = new Payment({ name, course, startDate, installmentDates, installmentAmounts, contact });
        await payment.save();
        res.status(201).json(payment);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to create payment record' });
      }
    });

// Endpoint to get installment details of a payment
router.get('/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const payment = await Payment.findOne({ name });
      if (!payment) {
        return res.status(404).json({ message: 'Payment record not found' });
      }
      res.json(payment.installmentDates);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Function to calculate installment dates
function calculateInstallmentDates(startDate) {
    const installmentDates = [];
    const startDateObj = new Date(startDate);
    for (let i = 0; i < 3; i++) {
      const installmentDate = new Date(startDateObj);
      installmentDate.setMonth(installmentDate.getMonth() + i);
      installmentDates.push(installmentDate);
    }
    return installmentDates;
  }

module.exports = router ;
