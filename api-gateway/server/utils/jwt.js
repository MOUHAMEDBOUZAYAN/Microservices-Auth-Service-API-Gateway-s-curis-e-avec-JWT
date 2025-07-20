const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'Mouhamed12@';

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};