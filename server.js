const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection string
const dbURI = process.env.MONGO_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Database connection error:', err));

// Define the Enrollment schema
const enrollmentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  gender: String,
  dob: Date,
  address: String,
  city: String,
  pinCode: Number,
  state: String,
  country: String,
  institution: String,
  qualifications: [String],
  courses: [String],
});

// Create the Enrollment model
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);


// Route to handle form submissions
app.post('/submit', async (req, res) => {
  const {
    firstName, lastName, email, mobileNumber, gender, dob, address, city, pinCode, state, country,
    institution, qualifications, courses,
  } = req.body;

  const newEnrollment = new Enrollment({
    firstName, lastName, email, mobileNumber, gender, dob, address, city, pinCode, state, country,
    institution, qualifications, courses,
  });

  try {
    await newEnrollment.save();
    
    res.status(200).send('Enrollment data saved successfully');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
