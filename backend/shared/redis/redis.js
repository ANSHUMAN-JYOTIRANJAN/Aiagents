import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 1,
  retryStrategy(times) {
    if (times > 3) return null;
    return Math.min(times * 100, 2000);
  },
  enableOfflineQueue: false,
});

redis.on("connect", () => {
  console.log("redis connected");
});

redis.on("error", (err) => {
  console.warn("Redis Warning:", err.message);
});

export default redis;
