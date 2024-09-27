import express from 'express';
import PetController from '../controllers/PetController';

const router = express.Router();

const petController = new PetController();

router.post('/', petController.createPet.bind(petController));

export default router;
