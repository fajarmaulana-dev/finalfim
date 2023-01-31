const { createClient } = require("redis");

const redisUrl =
  "redis://Minerva21!@redis-12291.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:12291";
const redisClient = createClient({ url: redisUrl });

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
