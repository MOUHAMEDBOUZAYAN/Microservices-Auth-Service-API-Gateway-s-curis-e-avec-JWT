const User = require('../models/User');
const jwt = require('../utils/jwt');

// Inscription
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }
    // Créer un nouvel utilisateur
    user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }
    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }
    // Générer un token JWT
    const token = jwt.generateToken({ id: user._id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Profil utilisateur (protégé)
exports.profile = async (req, res) => {
  try {
    // req.user est ajouté par le middleware d'authentification
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};