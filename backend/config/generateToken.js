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
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000
  });
  
  return token; // Don't set cookie

};
