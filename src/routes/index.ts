import { Router } from 'express';

import petRouter from './pet-router';
import adopterRouter from './adopter-router';

const router = (app: Router) => {
  app.use('/pets', petRouter);
  app.use('/adopters', adopterRouter);
};

export default router;
