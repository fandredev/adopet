import { Request, Response } from 'express';
import AdopterRepository from '../repositories/AdopterRepository';

import { StatusCodes } from 'http-status-codes';
import AdopterEntity from '../entities/AdopterEntity';
import AddressEntity from '../entities/AddressEntity';
import {
  PickAdopterFields,
  RequestBodyAdopter,
  RequestParamsAdopter,
  ResponseBodyAdopter,
} from '../types/Adopter';

export default class AdopterController {
  constructor(private repository: AdopterRepository) {}

  async create(
    req: Request<object, object, ResponseBodyAdopter>,
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
          error:
            error.message ||
            'Error ao criar um contato. Por favor, contate o suporte para resolvermos ou tente novamente mais tarde.',
        });
      }
    }
  }

  async read(
    req: Request<object, object, RequestBodyAdopter>,
    res: Response<ResponseBodyAdopter>
  ) {
    try {
      const adopters = await this.repository.read();
      const adoptersData: PickAdopterFields[] = adopters.map((adopter) => {
        return {
          id: adopter.id,
          name: adopter.name,
          phone: adopter.phone,
        };
      });

      return res.status(StatusCodes.OK).json({
        message:
          adoptersData.length === 0
            ? 'Sem adotadores no momento'
            : 'Adotadores encontrados',
        data: adoptersData,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:
          error.message ||
          'Erro ao buscar adotadores. Por favor, contate o suporte para resolvermos ou tente novamente mais tarde.',
      });
    }
  }

  async update(
    req: Request<RequestParamsAdopter, object, RequestBodyAdopter>,
    res: Response<ResponseBodyAdopter>
  ) {
    try {
      const adopter = req.body as AdopterEntity;
      const id = +req.params.id;

      await this.repository.update(id, adopter);

      return res.status(StatusCodes.OK).json({
        message: 'Adotador atualizado com sucesso',
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:
          error.message ||
          'Erro ao atualizar adotador. Por favor, contate o suporte para resolvermos ou tente novamente mais tarde.',
      });
    }
  }

  async delete(
    req: Request<RequestParamsAdopter, object, RequestBodyAdopter>,
    res: Response<ResponseBodyAdopter>
  ) {
    try {
      const id = +req.params.id;

      await this.repository.delete(id);

      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:
          error.message ||
          'Erro ao deletar adotador. Por favor, contate o suporte para resolvermos ou tente novamente mais tarde.',
      });
    }
  }

  async updateAddressAdopter(
    req: Request<RequestParamsAdopter, object, RequestBodyAdopter>,
    res: Response<ResponseBodyAdopter>
  ) {
    try {
      const address = req.body.address as AddressEntity;
      const id = +req.params.id;

      await this.repository.updateAddressAdopter(id, address);

      return res.status(StatusCodes.OK).json({
        message: 'Endereço do adotador atualizado com sucesso',
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:
          error.message ||
          'Erro ao atualizar endereço do adotador. Por favor, contate o suporte para resolvermos ou tente novamente mais tarde.',
      });
    }
  }
}
