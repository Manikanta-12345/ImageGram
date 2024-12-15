export const isAdminCheck = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
