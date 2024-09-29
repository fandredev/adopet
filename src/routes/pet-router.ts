import express from 'express';
import PetController from '../controllers/PetController';
import PetRepository from '../repositories/PetRepository';

import { appDataSource } from '../config/data-source';

const router = express.Router();

const petRepository = new PetRepository(
  appDataSource.getRepository('PetEntity')
);
const petController = new PetController(petRepository);

router.post('/create', petController.createPet.bind(petController));
router.get('/list', petController.listPets.bind(petController));
router.put('/update/:id', petController.updatePet.bind(petController));
router.delete('/remove/:id', petController.removePet.bind(petController));

export default router;
