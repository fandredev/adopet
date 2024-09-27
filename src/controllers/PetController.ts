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

  listPets(req: Request, res: Response) {
    return res.status(200).json(listOfPets);
  }

  updatePet(req: Request, res: Response) {
    const { id } = req.params;
    const { adopted, name, age, breed } = req.body as Pet;
    const pet = listOfPets.find((pet) => pet.id === +id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    pet.name = name;
    pet.age = age;
    pet.breed = breed;
    pet.adopted = adopted;
    return res.status(200).json(pet);
  }

  removePet(req: Request, res: Response) {
    const { id } = req.params;

    const pet = listOfPets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado' });
    }
    const index = listOfPets.indexOf(pet);
    listOfPets.splice(index, 1);

    return res.status(200).json({ mensagem: 'Pet deletado com sucesso' });
  }
}
