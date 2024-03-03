import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/router.ts';
import errorHandler from './middleware/errorHandler.ts';
import rateLimiter from './middleware/rateLimiter.ts';

const app = express();

// Apply rate limiter middleware to limit the rate of incoming requests.
app.use(rateLimiter);

// Middleware for parsing JSON request bodies.
app.use(express.json());

// Middleware for parsing URL-encoded request bodies.
app.use(express.urlencoded({ extended: true }));

// Middleware for enabling CORS (Cross-Origin Resource Sharing).
app.use(cors());

// Mount the router middleware to handle all routes starting with '/api/v1'.
app.use('/api/v1', router);

// Error handling middleware to handle any errors that occur during request processing.
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
