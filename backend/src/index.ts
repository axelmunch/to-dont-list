import { configDotenv } from 'dotenv';
import app from './app.js';

configDotenv();

const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000;

app
  .listen({ port: PORT })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
