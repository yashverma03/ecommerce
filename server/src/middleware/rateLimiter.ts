import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({ error: 'Too many requests, please try again later' });
  }
});
