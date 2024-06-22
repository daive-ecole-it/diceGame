const express = require('express');
const router = express.Router();
const Configuration = require('../models/Configuration');

// @route   POST api/configuration
// @desc    Create a new game configuration
// @access  Public
router.post('/', async (req, res) => {
  const { session, numberOfPlayers, numberOfDices, numberOfGames, waitTimeBetweenGames } = req.body;
  
  try {
    const newConfig = new Configuration({
      session,
      numberOfPlayers,
      numberOfDices,
      numberOfGames,
      waitTimeBetweenGames
    });

    const config = await newConfig.save();
    res.json(config);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
