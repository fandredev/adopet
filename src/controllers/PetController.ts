import { Request, Response } from 'express';

let listOfPets = [];

export default class PetController {
  createPet(req: Request, response: Response) {
    const newPet = req.body;

    listOfPets.push(newPet);

    return response.status(201).json(newPet);
  }
}
