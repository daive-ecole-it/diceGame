const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    numberOfDices: { type: Number, required: true },
    numberOfGames: { type: Number, required: true },
    waitTimeBetweenGames: { type: Number, required: true }
  });
  
  module.exports = mongoose.model('Configuration', ConfigurationSchema);
  