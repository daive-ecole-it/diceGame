const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/test');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();