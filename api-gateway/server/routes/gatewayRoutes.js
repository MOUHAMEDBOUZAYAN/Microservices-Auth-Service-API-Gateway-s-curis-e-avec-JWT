const express = require('express');
const router = express.Router();
const proxy = require('../proxy/reverseProxy');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Exemple : proxy pour les routes d'authentification
router.use('/auth', proxy('http://auth-service:5000'));

// Exemple : route protégée par JWT
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Accès autorisé via API Gateway !', user: req.user });
});

// Exemple : route protégée par rôle (admin)
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Bienvenue, admin via API Gateway !' });
});

module.exports = router;