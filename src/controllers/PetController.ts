import { Request, Response } from 'express';
import type { Pet } from '../types/Pet';
import { invalidBreed } from '../utils/invalid-breed';

import { StatusCodes } from 'http-status-codes';

let listOfPets: Pet[] = [];
let id = 0;

function generateId() {
  id += 1;
  return id;
}

export default class PetController {
  createPet(req: Request, response: Response) {
    const pet = req.body as Pet;
    const validBreed = invalidBreed(pet.breed);

    if (!validBreed) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: `Raça inválida. Use 'dog' ou 'cat' para raça.`,
      });
    }

    const newPet: Pet = {
      id: generateId(),
      ...pet,
    };

    listOfPets.push(newPet);

    return response.status(StatusCodes.CREATED).json(newPet);
  }

  listPets(_: Request, res: Response) {
    return res.status(StatusCodes.OK).json(listOfPets);
  }

  updatePet(req: Request, res: Response) {
    const { id } = req.params;
    const { adopted, name, dateNasc, breed } = req.body as Pet;
    const pet = listOfPets.find((pet) => pet.id === +id);

    if (!pet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Pet não encontrado' });
    }

    pet.name = name;
    pet.dateNasc = dateNasc;
    pet.breed = breed;
    pet.adopted = adopted;
    return res.status(StatusCodes.OK).json(pet);
  }

  removePet(req: Request, res: Response) {
    const { id } = req.params;

    const pet = listOfPets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ erro: 'Pet não encontrado' });
    }
    const index = listOfPets.indexOf(pet);
    listOfPets.splice(index, 1);

    return res
      .status(StatusCodes.OK)
      .json({ mensagem: 'Pet deletado com sucesso' });
  }
}
