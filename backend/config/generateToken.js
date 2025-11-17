import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res,userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,   // only https
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
      domain: process.env.BACKEND_API // 👈 REQUIRED FOR IPHONE

  });
  
  return token; // Don't set cookie

};
