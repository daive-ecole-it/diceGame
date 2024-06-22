const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  PlayerName: { type: String, required: true, unique: true },
  lastLogin: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', PlayerSchema);

