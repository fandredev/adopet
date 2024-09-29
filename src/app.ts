import express from 'express';
import router from './routes';
import 'reflect-metadata';
import { appDataSource } from './config/data-source';

const app = express();
app.use(express.json());

router(app);

appDataSource
  .initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Error connecting to database', error));

export default app;
