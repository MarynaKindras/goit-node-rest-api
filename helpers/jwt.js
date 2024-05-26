import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET;

export const createToken = payload => jwt.sign(payload, SECRET, { expiresIn: "20h" });

export const verifyToken = token => jwt.verify(token, SECRET);
