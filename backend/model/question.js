const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: [arr => arr.length >= 2,'Atleast 2 options are requires']
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
  explanation: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Questions', questionSchema);
