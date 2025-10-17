import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args: string[]) => redisClient.call(...args),
//   }),
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests, try again later.",
// });

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 50,
  standardHeaders: true,
  message: "Too many requests, try again later.",
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  message: "Too many attempts, please try again later.",
});