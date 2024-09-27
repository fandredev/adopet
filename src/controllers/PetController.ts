import { Request, Response } from 'express';
import type { Pet } from '../types/Pet';

let listOfPets: Pet[] = [];

export default class PetController {
  createPet(req: Request, response: Response) {
    const pet = req.body as Pet;

    const newPet: Pet = {
      ...pet,
    };

    listOfPets.push(newPet);

    return response.status(201).json(newPet);
  }
}
