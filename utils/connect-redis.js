require("dotenv").config();
const { createClient } = require("redis");
const redisClient = createClient({ url: process.env.REDIS });

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected...");
  } catch (err) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();
redisClient.on("error", (err) => console.log(err));
module.exports = redisClient;
