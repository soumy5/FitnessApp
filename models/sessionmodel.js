const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // in minutes
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
