import express from 'express';

import { appDataSource } from '../config/data-source';
import AdopterController from '../controllers/AdopterController';
import AdopterRepository from '../repositories/AdopterRepository';

const router = express.Router();

const adopterRepository = new AdopterRepository(
  appDataSource.getRepository('AdopterEntity')
);
const adopterController = new AdopterController(adopterRepository);

router.post('/create', adopterController.create.bind(adopterController));

export default router;
