import jwt from "jsonwebtoken";

 export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

      if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
