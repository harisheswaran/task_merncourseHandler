const express = require('express');

const router = express.Router();

const course = require('../model/home');
const authenticate = require('../middleware/authorize');
const upload = require('../uploads/upload');

router.post('/addcourse', upload.single('file'), authenticate.auth, authenticate.checkAdmin, async (req, res) => {
    try {
        const { id, title, batch } = await req.body;
        const existingCourse = await course.findOne({ title });
        if(existingCourse){
            return res.status(401).send({
                message: 'Course already exists'
            });
        }
        const members = JSON.parse(req.body.members); 
        const filePath = req.file ? req.file.path : null;
        if (!id || !title || !batch || !members) {
            res.status(401).json({ message: "Invalid inputs" });
        }
        const newData = new course({ id, title, batch, members, filePath });
        await newData.save();
        res.status(201).json({ message: "Created", group: newData });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.get('/', authenticate.auth, async (req, res) => {
    try {
        const data = await course.find();
        if (!data) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', authenticate.auth, async (req, res) => {
    try {
        const data = await course.findById(req.params.id);
        if (!data) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', authenticate.checkAdmin, authenticate.auth, async (req, res) => {
    try {
        const courseupdate = await course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!courseupdate) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({
            message: 'Course updated',
            question: courseupdate
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authenticate.auth, authenticate.checkAdmin, async (req, res) => {
    try {
        const coursedelete = await course.findByIdAndDelete(req.params.id);
        if (!coursedelete) {
            res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({
            message: 'Course deleted',
            couse: coursedelete
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;