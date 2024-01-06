import express from 'express';
import 'dotenv/config';
import router from './router/router.ts';
import connection from './database/database.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

connection.connect((error) => {
  if (error != null) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL');
  }
});

const { PORT } = process.env ?? 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
