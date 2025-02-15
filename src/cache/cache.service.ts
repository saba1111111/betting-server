import redisClient from "./redisClient";

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redisClient.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function setCache(
  key: string,
  data: any,
  ttl: number = 60
): Promise<void> {
  await redisClient.set(key, JSON.stringify(data), "EX", ttl);
}

export async function deleteCache(key: string): Promise<void> {
  await redisClient.del(key);
}

export async function deleteKeysByPattern(pattern: string): Promise<void> {
  const keys = await redisClient.keys(pattern);
  if (keys.length > 0) {
    await redisClient.del(...keys);
  }
}
