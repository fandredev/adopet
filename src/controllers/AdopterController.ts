import { Request, Response } from 'express';
import AdopterRepository from '../repositories/AdopterRepository';

import { StatusCodes } from 'http-status-codes';
import AdopterEntity from '../entities/AdopterEntity';
import AddressEntity from '../entities/AddressEntity';
import { RequestBodyAdopter, ResponseBodyAdopter } from '../types/Adopter';

export default class AdopterController {
  constructor(private repository: AdopterRepository) {}

  async create(
    req: Request<object, object, RequestBodyAdopter>,
    res: Response<ResponseBodyAdopter>
  ) {
    try {
      const adopter = req.body as AdopterEntity;

      const adopterEntity = new AdopterEntity();
      const addressEntity = new AddressEntity(
        adopter.address.city,
        adopter.address.uf
      );

      adopterEntity.name = adopter.name;
      adopterEntity.password = adopter.password;
      adopterEntity.phone = adopter.phone;
      adopterEntity.photo = adopter.photo;
      adopterEntity.address = addressEntity;

      await this.repository.create(adopterEntity);

      return res.status(StatusCodes.CREATED).json({
        data: {
          id: adopterEntity.id,
          name: adopterEntity.name,
          phone: adopterEntity.phone,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: error.message || 'Algum erro inesperado aconteceu',
        });
      }
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

  async updateAddressAdopter(req: Request, res: Response) {
    try {
      const address = req.body as AddressEntity;
      const id = +req.params.id;

      const response = await this.repository.updateAddressAdopter(id, address);

      if (!response.success) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: response.message,
        });
      }

      return res.status(StatusCodes.OK).json({
        message: response.message,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao atualizar endereço do adotador',
        error,
      });
    }
  }
}
