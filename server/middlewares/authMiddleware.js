const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwtUtils.verifyToken(token);
    req.user = decodedToken;
    req.userId = decodedToken.userId;
    req.userType = decodedToken.userType;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized: No refresh token provided" });
      }
      try {
        const decodedRefreshToken = jwtUtils.verifyRefreshToken(refreshToken);
        const newAccessToken = jwtUtils.generateToken({
          _id: decodedRefreshToken.userId,
          role: decodedRefreshToken.userType,
        });

        res.setHeader("Authorization", `Bearer ${newAccessToken}`);

        req.user = decodedRefreshToken;
        req.userId = decodedRefreshToken.userId;
        req.userType = decodedRefreshToken.userType;
        next();
      } catch (refreshError) {
        console.error("Refresh token verification error:", refreshError.message);
        return res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
      }
    } else {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
};
