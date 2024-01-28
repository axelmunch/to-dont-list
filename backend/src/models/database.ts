import { Sequelize } from 'sequelize';

const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: console.log,
});

export default database;
