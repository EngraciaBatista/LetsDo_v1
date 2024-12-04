const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 600000,
  });
  return token;
};
module.exports = generateToken;
