const express = require('express');

const router = express.Router();

const Document = require('../model/home2');
const { auth, checkAdmin } = require('../middleware/authorize');

router.post('/addfile', auth, checkAdmin,async (req,res) => {
    try {
    const { name, size, format, path } = req.body;

    if (!name || !size || !format || !path) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const document = new Document({
      name,
      size,
      format,
      path
    });

    const savedDocument = await document.save();
    res.status(201).json({ message: 'File Data created', document: savedDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const documents = await Document.findById(req.params.id);
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const { name, format, size } = req.body;

    // Check for missing fields (optional)
    if (!name || !format || !size) {
      return res.status(400).json({ message: 'name, format, and size are required.' });
    }

    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      { name, format, size },
      { new: true, runValidators: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: 'File not found.' });
    }

    return res.status(200).json({ message: 'File updated', document: updatedDoc });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, checkAdmin, async (req, res) => {
  try {
    const deletedDoc = await Document.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res.status(404).json({ message: 'File not found.' });
    }

    return res.status(200).json({ message: 'File deleted' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;