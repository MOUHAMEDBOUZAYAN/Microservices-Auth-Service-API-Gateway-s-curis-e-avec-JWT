const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  const decoded = jwt.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }

  req.user = decoded; // Ajoute les infos du user à la requête
  next();
};