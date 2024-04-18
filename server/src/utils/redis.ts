import redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = new redis({
  host: process.env.REDIS_SERVICE_NAME as string,
  port: Number(process.env.REDIS_PORT),
});

export default redisClient;
