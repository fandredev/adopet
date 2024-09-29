import { Request, Response } from 'express';
import AdopterRepository from '../repositories/AdopterRepository';

import { StatusCodes } from 'http-status-codes';
import AdopterEntity from '../entities/AdopterEntity';

export default class AdopterController {
  constructor(private repository: AdopterRepository) {}

  create(req: Request, res: Response) {
    try {
      const adopter = req.body as AdopterEntity;

      const adopterEntity = new AdopterEntity();

      adopterEntity.name = adopter.name;
      adopterEntity.password = adopter.password;
      adopterEntity.phone = adopter.phone;
      adopterEntity.photo = adopter.photo;
      adopterEntity.address = adopter.address;

      this.repository.create(adopterEntity);

      return res.status(StatusCodes.CREATED).json({
        message: 'Adotador criado com sucesso',
        adopter,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao criar adotador',
        error,
      });
    }
  }

  async read(_: Request, res: Response) {
    const listAdopters = await this.repository.read();

    return res.status(StatusCodes.OK).json(listAdopters);
  }

  async update(req: Request, res: Response) {
    try {
      const adopter = req.body as AdopterEntity;
      const id = +req.params.id;

      await this.repository.update(id, adopter);

      return res.status(StatusCodes.OK).json({
        message: 'Adotador atualizado com sucesso',
        adopter,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Erro ao atualizar adotador',
          error: error.message,
        });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = +req.params.id;

      await this.repository.delete(id);

      return res.status(StatusCodes.OK).json({
        message: 'Adotador deletado com sucesso',
        id,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao deletar adotador',
        error,
      });
    }
  }
}
