const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};