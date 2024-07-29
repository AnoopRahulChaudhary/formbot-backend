import InvalidTokenError from "../error/invalidToken.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  try {
    const token = req.header("Authorization".toLowerCase());
    if (!token) {
      throw new InvalidTokenError("Token not found or invaild.");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error(error);
      throw new InvalidTokenError("Token not found or invaild.");
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
}

export default verifyToken;
