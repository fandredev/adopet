import { Router } from 'express';

import petRouter from './pet-router';

const router = (app: Router) => {
  app.use('/pets', petRouter);
};

export default router;
