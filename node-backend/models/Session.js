const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  numberOfDices: { type: Number, required: true },
  numberOfGames: { type: Number, required: true },
  score: { type: Number, required: true },
  waitTimeBetweenGames: { type: Number, required: true }
});

module.exports = mongoose.model('Session', SessionSchema);
