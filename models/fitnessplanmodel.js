const mongoose = require('mongoose');

const fitnessplanSchema = new mongoose.Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    exercises: [{
        name: { type: String, required: true },
        duration: { type: Number, required: true }, // in minutes
        videoURL: { type: String, required: true }
    }],
}, { timestamps: true });

const fitnessplan = mongoose.model('fitnessplan', fitnessplanSchema);

module.exports = fitnessplan;
