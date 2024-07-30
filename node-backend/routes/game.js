const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
router.post('/game', async (req, res) => {
  const { sessionId, playerId, score } = req.body;

  try {
    const game = new Game({
      startDate: new Date(),
      endDate: new Date(), // Vous pouvez gérer la date de fin comme vous le souhaitez
      player: playerId,
      score: score,
      session: sessionId
    });

    const savedGame = await game.save();

    const session = await Session.findById(sessionId);
    session.games.push(savedGame._id);
    await session.save();

    res.status(201).json(savedGame);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

