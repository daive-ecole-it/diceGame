const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  score: { type: Number, required: true },
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true }
});

module.exports = mongoose.model('Game', GameSchema);
