const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    const dbConnection = mongoose.connection;

    dbConnection.on('connected', () => {
      console.log('MongoDB Connected...');
    });

    dbConnection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Arrêter l'application en cas d'erreur de connexion
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Arrêter l'application en cas d'erreur
  }
};

module.exports = connectDB;
