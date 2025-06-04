const mongoose = require('mongoose');

const fileInfo = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: true, 
        },
        size: {
            type: Number, 
            required: true,
        },
        format: {
            type: String, 
            required: true,
        },
        uploadedAt: {
            type: Date,
            default: Date.now, 
        },
        path: {
            type: String, 
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('fileDetails', fileInfo);