const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Convert email to lowercase for case-insensitive comparisons
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value), // Basic email validation
      message: 'Please enter a valid email address.',
    },
  },
  rating: {
    type: String, // Or adjust data type based on your rating options (e.g., Number)
    required: true,
  
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  createdAt: { // Optional: Timestamp for feedback creation
    type: Date,
    default: Date.now,
  },
  updatedAt: { // Optional: Timestamp for feedback updates
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;