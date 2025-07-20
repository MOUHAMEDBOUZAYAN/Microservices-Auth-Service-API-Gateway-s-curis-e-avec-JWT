module.exports = (roles = []) => {
    // roles peut être une chaîne ou un tableau
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Accès refusé : rôle manquant.' });
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès refusé : rôle insuffisant.' });
      }
  
      next();
    };
  };