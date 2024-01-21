import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './router/router.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', router);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
