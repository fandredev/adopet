import express from 'express';
import PetController from '../controllers/PetController';
import PetRepository from '../repositories/PetRepository';

import { appDataSource } from '../config/data-source';

const router = express.Router();

const petRepository = new PetRepository(
  appDataSource.getRepository('PetEntity'),
  appDataSource.getRepository('AdopterEntity')
);
const petController = new PetController(petRepository);

router.post('/create', petController.create.bind(petController));
router.get('/read', petController.read.bind(petController));
router.put('/update/:id', petController.update.bind(petController));
router.delete('/remove/:id', petController.remove.bind(petController));

router.put(
  '/adopt/:petId/:adopterId',
  petController.adoptPet.bind(petController)
);

router.get(
  '/findByAnything',
  petController.findPetByAnything.bind(petController)
);

export default router;
