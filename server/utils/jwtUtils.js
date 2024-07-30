const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'shadin_access_token_secret';
const JWT_EXPIRES_IN = '1h'; 
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'shadin_refresh_token_secret';
const REFRESH_TOKEN_EXPIRES_IN = '30d'; 

function generateToken(user) {
  return jwt.sign({ userId: user._id, userType: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id, userType: user.role }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
};
