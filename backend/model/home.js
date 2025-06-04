const mongoose = require('mongoose');

const courseDetail = new mongoose.Schema({
   id:{
    type: String,
    required: [true,'Please add a text value']
   },
   title:{
    type: String,
    required: [true,'Please add a text value']
   },
   batch:{
    type: String,
    required: [true,'Please add a text value']
   },
    members: [
      {
        name: {
          type: String,
          required: [true, 'Please add member name']
        },
        rollno: {
          type: String,
          required: [true, 'Please add member roll number']
        }
      }
    ],
  filePath: {
    type: String, 
    required: false
  }
},
{
  timestamps: true,  
},
);

const courseInf = mongoose.model('courseDetails',courseDetail);
module.exports = courseInf;

