import express from 'express';
import PetController from '../controllers/PetController';
import PetRepository from '../repositories/PetRepository';

import { appDataSource } from '../config/data-source';

const router = express.Router();

const petRepository = new PetRepository(
  appDataSource.getRepository('PetEntity')
);
const petController = new PetController(petRepository);

router.post('/create', petController.create.bind(petController));
router.get('/list', petController.read.bind(petController));
router.put('/update/:id', petController.update.bind(petController));
router.delete('/remove/:id', petController.remove.bind(petController));

export default router;
