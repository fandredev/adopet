import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import IAdopterRepository from './interface/IAdopterRepository';
import AdopterEntity from '../entities/AdopterEntity';
import AddressEntity from '../entities/AddressEntity';

export default class AdopterRepository implements IAdopterRepository {
  private _repository: Repository<AdopterEntity>;

  constructor(protected repository: Repository<AdopterEntity>) {
    this._repository = repository;
  }

  async create(adopter: AdopterEntity) {
    await this._repository.save(adopter);
  }

  async read(): Promise<AdopterEntity[]> {
    return await this._repository.find();
  }

  async update(id: number, adopter: AdopterEntity): Promise<UpdateResult> {
    try {
      const findAdopter = await this._repository.findOne({
        where: { id },
      });

      if (!findAdopter) {
        throw new Error('Adotador não encontrado.');
      }

      const newAdopter = { ...findAdopter, ...adopter };
      return await this._repository.update(id, newAdopter);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      const findAdopter = await this._repository.findOne({
        where: { id },
      });

      if (!findAdopter) {
        throw new Error('Adotador não encontrado.');
      }

      return await this._repository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async updateAddressAdopter(idAdopter: number, address: AddressEntity) {
    try {
      const findAdopter = await this._repository.findOne({
        where: { id: idAdopter },
        relations: ['address'],
      });

      if (!findAdopter) {
        throw new Error('Adotador não encontrado.');
      }

      if (!findAdopter.address) {
        findAdopter.address = new AddressEntity(address.city, address.uf);
      } else {
        findAdopter.address.city = address.city;
        findAdopter.address.uf = address.uf;
      }
      return await this._repository.save(findAdopter);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
