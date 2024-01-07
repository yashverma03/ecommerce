import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT } = process.env;

const sequelize = new Sequelize({
  dialect: DB_DIALECT as Dialect,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

const syncDatabase = async () => {
  await sequelize.sync({ force: false });
};

void syncDatabase();

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
