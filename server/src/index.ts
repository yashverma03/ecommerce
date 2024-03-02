import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/router.ts';
import errorHandler from './middleware/errorHandler.ts';
import rateLimiter from './middleware/rateLimiter.ts';

const app = express();

app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', router);

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
