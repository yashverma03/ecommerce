import { Sequelize } from 'sequelize';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, LOGGING } = process.env;
const logging = LOGGING === 'true';

/**
 * Sequelize instance representing a connection to the database.
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging
});

/**
 * Synchronizes the database schema with the Sequelize models.
 * @returns {Promise<void>} A Promise that resolves when the synchronization process is complete.
 */
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false, logging });
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

void syncDatabase();

export default sequelize;
