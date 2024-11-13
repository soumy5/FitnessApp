const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badge: { type: String, required: true },
    points: { type: Number, required: true }, 
    leaderboardRank: { type: Number } 
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
