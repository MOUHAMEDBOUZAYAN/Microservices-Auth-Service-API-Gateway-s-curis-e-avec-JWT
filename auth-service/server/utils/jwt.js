const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'votre_cle_secrete';

// Générer un token JWT
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Vérifier et décoder un token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};