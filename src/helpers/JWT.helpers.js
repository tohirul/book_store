import jwt from "jsonwebtoken";

const createToken = (payload, key, expiration) => {
  return jwt.sign(payload, key, { expiresIn: expiration });
};

const verifyToken = (token, key) => {
  return jwt.verify(token, key);
};

const JWTHelpers = {
  createToken,
  verifyToken,
};

export default JWTHelpers;
