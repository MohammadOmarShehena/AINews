import Redis from "ioredis";
import { env } from "./env";

export function createRedisClient() {
  if (!env.REDIS_URL) return null as any;
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
      return Math.min(times * 100, 3000);
    },
    ...(env.REDIS_URL.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {})
  });

  client.on("error", (err) => {
    console.error("[Redis Client Error]", err.message);
  });

  return client;
}

export const redis = createRedisClient();
