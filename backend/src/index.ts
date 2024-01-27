import { configDotenv } from 'dotenv';
import { app } from './app.js';

configDotenv();

const PORT: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000;

const server = app.listen(PORT, () => {
  const serverHost = server.address().address;
  const serverPort = server.address().port;
  console.log(`Server started on  http://${serverHost}:${serverPort}`);
});
