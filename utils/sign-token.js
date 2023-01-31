require("dotenv").config();
const jwt = require("jsonwebtoken");
const redisClient = require("./connect-redis");

module.exports = async (user) => {
  const access_token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "10m" }
  );

  const refresh_token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.REFRESH_KEY,
    { expiresIn: "1d" }
  );
  redisClient.set(user.id, JSON.stringify(user), { EX: 60 * 60 });

  return { accessToken: access_token, refreshToken: refresh_token };
};
