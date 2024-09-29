import { Request, Response } from 'express';
import type { Pet } from '../types/Pet';
import { invalidBreed } from '../utils/invalid-breed';

import { StatusCodes } from 'http-status-codes';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

let listOfPets: Pet[] = [];
let id = 0;

function generateId() {
  id += 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {}

  createPet(req: Request, response: Response) {
    const pet = req.body as PetEntity;
    const validBreed = invalidBreed(pet.breed);

    if (!validBreed) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: `Raça inválida. Use 'dog' ou 'cat' para raça.`,
      });
    }

    const petEntity = new PetEntity();
    petEntity.id = generateId();
    petEntity.name = pet.name;
    petEntity.dateNasc = pet.dateNasc;
    petEntity.breed = pet.breed;
    petEntity.adopted = false;

    this.repository.create(petEntity);

    return response.status(StatusCodes.CREATED).json(petEntity);
  }

  async listPets(_: Request, res: Response) {
    const listPets = await this.repository.read();

    return res.status(StatusCodes.OK).json(listPets);
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
