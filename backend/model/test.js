const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String], 
    required: true,
    validate: [arr => arr.length >= 2, 'At least two options required']
  },
}, { _id: false });

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Test title is required']
  },
  description: {
    type: String,
    required: false
  },
  startTime: {
    type: Date,
    required: [true, 'Test start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'Test end time is required']
  },
  questions: {
    type: [questionSchema],
    required: [true, 'At least one question is required']
  }
},{timestamps:true});

module.exports = mongoose.model('Testcreation', testSchema);
