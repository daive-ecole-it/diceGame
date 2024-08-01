// routes/session.js
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// @route   GET api/session
// @desc    Get all game sessions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().populate('creator', 'username');
    console.log(sessions); 
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  const { creator, numberOfPlayers, numberOfDices, numberOfGames, waitTimeBetweenGames } = req.body;

  try {
    const newSession = new Session({
      startDate: new Date(),
      creator,
      challengers: [],
      games: []
    });

    const session = await newSession.save();

    const configData = {
      session: session._id,
      numberOfPlayers,
      numberOfDices,
      numberOfGames,
      waitTimeBetweenGames
    };

    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/session/join/:id
// @desc    Join an existing game session
// @access  Public
router.put('/join/:id', async (req, res) => {
  const { userId } = req.body;
  const sessionId = req.params.id;

  try {
    const session = await Session.findById(sessionId);
    if (session) {
      session.challengers.push(userId);
      await session.save();

      getIo().emit('updateSession', session); // Emit to all clients

      res.json(session);
    } else {
      res.status(404).send('Session not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
