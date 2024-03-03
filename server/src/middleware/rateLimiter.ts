import rateLimit from 'express-rate-limit';

/**
 * Middleware function to limit the rate of incoming requests.
 * @param {RateLimitOptions} options - The options object for configuring rate limiting.
 * @returns {RateLimitRequestHandler} The Express middleware function for rate limiting.
 */
const rateLimiter = rateLimit({
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({ error: 'Too many requests, please try again later' });
  }
});

export default rateLimiter;
