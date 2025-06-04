const express = require('express');
const router = express.Router();
const Test = require('../model/test');
const { auth, checkAdmin } = require('../middleware/authorize');

router.post('/addtest', auth, checkAdmin, async (req, res) => {
  try {
    const { title, description, startTime, endTime, questions } = req.body;

    if (!title || !startTime || !endTime || !Array.isArray(questions) || questions.length === 0) {
       res.status(400).json({ message: 'Missing fields or questions array is empty' });
    }

    const newTest = new Test({
      title,
      description,
      startTime,
      endTime,
      questions
    });

    const savedTest = await newTest.save();
     res.status(201).json({ message: 'Test created', test: savedTest });

  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
     res.status(200).json(tests);
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
       res.status(404).json({ message: 'Test not found' });
    }
     res.status(200).json(test);
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({
      message: 'Test updated',
      test: updatedTest
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);

    if (!deletedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

