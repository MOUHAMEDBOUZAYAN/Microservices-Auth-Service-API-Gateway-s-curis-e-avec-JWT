const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Route d'inscription
router.post('/register', authController.register);

// Route de connexion
router.post('/login', authController.login);

// Exemple de route protégée (nécessite un token JWT valide)
router.get('/profile', authMiddleware, authController.profile);

// Exemple de route protégée par rôle (admin uniquement)
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Bienvenue, admin !' });
});

module.exports = router;