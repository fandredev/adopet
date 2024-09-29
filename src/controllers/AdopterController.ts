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
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Erro ao criar adotador',
        error,
      });
    }
  }

  async read(_: Request, res: Response) {
    const listAdopters = await this.repository.read();

    return res.status(StatusCodes.OK).json(listAdopters);
  }
}
