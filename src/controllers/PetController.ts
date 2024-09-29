import { Request, Response } from 'express';
import { invalidBreed } from '../utils/invalid-breed';

import { StatusCodes } from 'http-status-codes';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

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

  async updatePet(req: Request, res: Response) {
    await this.repository.update(+req.params.id, req.body);

    return res.status(StatusCodes.OK).json({
      message: 'Pet atualizado com sucesso',
    });
  }

  async removePet(req: Request, res: Response) {
    await this.repository.delete(+req.params.id);

    return res.status(StatusCodes.OK).json({
      message: 'Pet removido com sucesso',
    });
  }
}
