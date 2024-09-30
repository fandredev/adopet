import { Request, Response } from 'express';
import { invalidBreed } from '../utils/invalid-breed';

import { StatusCodes } from 'http-status-codes';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';
import { invalidPetHeightAnimal } from '../utils/invalid-height-animal';

export default class PetController {
  constructor(private repository: PetRepository) {}

  create(req: Request, response: Response) {
    const pet = req.body as PetEntity;
    const validBreed = invalidBreed(pet.breed);
    const validHeightAnimal = invalidPetHeightAnimal(
      pet.heightAnimal && pet.heightAnimal
    );

    if (!validBreed) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: `Raça inválida. Use 'cachorro' ou 'gato' para raça.`,
      });
    }

    if (!validHeightAnimal) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        error: `Altura inválida. Use 'pequeno', 'medio' ou 'grande' para altura do animal.`,
      });
    }

    const petEntity = new PetEntity();
    petEntity.name = pet.name;
    petEntity.heightAnimal = pet.heightAnimal;
    petEntity.dateNasc = pet.dateNasc;
    petEntity.breed = pet.breed;
    petEntity.adopted = false;

    this.repository.create(petEntity);

    return response.status(StatusCodes.CREATED).json(petEntity);
  }

  async read(_: Request, res: Response) {
    const listPets = await this.repository.read();

    return res.status(StatusCodes.OK).json(listPets);
  }

  async update(req: Request, res: Response) {
    await this.repository.update(+req.params.id, req.body);

    return res.status(StatusCodes.OK).json({
      message: 'Pet atualizado com sucesso',
    });
  }

  async remove(req: Request, res: Response) {
    await this.repository.delete(+req.params.id);

    return res.status(StatusCodes.OK).json({
      message: 'Pet removido com sucesso',
    });
  }

  async adoptPet(req: Request, res: Response) {
    try {
      const { petId, adopterId } = req.body;

      await this.repository.adoptPet(petId, adopterId);

      return res.status(StatusCodes.OK).json({
        message: 'Pet adotado com sucesso',
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }
}
