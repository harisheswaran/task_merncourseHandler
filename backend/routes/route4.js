const express = require('express');
const router = express.Router();
const Question = require('../model/question');
const { auth, checkAdmin } = require('../middleware/authorize');

router.post('/addquestion', auth, checkAdmin, async (req, res) => {
  try {
    const { questionText, options, correctAnswer, explanation } = req.body;

    const newQuestion = new Question({
      questionText,
      options,
      correctAnswer,
      explanation
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      message: 'Question created successfully',
      question: savedQuestion
    });
  } catch (error) {
     res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req,res) =>{
    try{
        const question = await Question.find().sort({ createdAt: -1 });
        if(!question){
        res.status(400).json({ message: 'Questions not found' });
        }
        res.status(200).json(question);
    }
    catch(error){
         res.status(400).json({ error: error.message });
    }
});

router.get('/:id',auth, async (req,res) => {
    try{
    const q = await Question.findById(req.params.id);
    if(!q){
        res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(q);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id',auth, checkAdmin, async (req,res) => {
    try{
    const qupdate = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if(!qupdate){
        res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({
      message: 'Question updated',
      question: qupdate
    });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id',auth, checkAdmin, async (req,res) =>{
    try {
        const qdelete = await Question.findByIdAndDelete(req.params.id);
        if(!qdelete){
        res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({
            message: 'Question deleted',
            question: qdelete
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
