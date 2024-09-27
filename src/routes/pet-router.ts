import express from 'express';
import PetController from '../controllers/PetController';

const router = express.Router();

const petController = new PetController();

router.post('/create', petController.createPet.bind(petController));
router.get('/list', petController.listPets.bind(petController));
router.put('/update/:id', petController.updatePet.bind(petController));
router.delete('/remove/:id', petController.removePet.bind(petController));

export default router;
