const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = ']&hQ^K8-%UWi0ILmu4@?5Ay(NW*6Hs=!'; // Clé secrète utilisée pour signer le token

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Route pour vérifier l'existence d'un utilisateur
router.post('/check', async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    return res.json({ lastLogin: user.lastLogin });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// Route pour la connexion et la création de compte
router.post('/login', async (req, res) => {
  const { username } = req.body;

  try {
    let user;
    if (username) {
      user = await User.findOne({ username });

      if (!user) {
        user = new User({ username });
      } 
      user.lastLogin = new Date();
      await user.save();
    } else {
      const randomUsername = `Guest_${Math.floor(Math.random() * 10000)}`;
      user = new User({ username: randomUsername });
      await user.save();
    }

    const token = generateToken(user.id);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
