const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    exercise_type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories_burned: { type: Number, required: true },
    user_references: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);