import { configDotenv } from 'dotenv';
import app from './app.js';
import { database } from './models/index.js';

configDotenv();

const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3001;

database
  .sync()
  .then(() => {
    console.log('Database synced');
    app
      .listen({ port: PORT })
      .then((address) => {
        console.log(`Server listening at ${address}`);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
