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
router.get('/read', adopterController.read.bind(adopterController));
router.put('/update/:id', adopterController.update.bind(adopterController));
router.delete('/delete/:id', adopterController.delete.bind(adopterController));

export default router;
