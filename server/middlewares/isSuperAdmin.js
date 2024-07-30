// Check if user is superadmin
exports.isSuperadmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
