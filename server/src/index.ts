import express from 'express';
import 'dotenv/config';
import router from './router/router.ts';
// import { testConnection } from './database/database.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// void testConnection();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
