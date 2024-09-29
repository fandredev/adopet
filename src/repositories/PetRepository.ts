import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import PetEntity from '../entities/PetEntity';
import InterfacePetRepository from './interface/IPetRepository';

export default class PetRepository implements InterfacePetRepository {
  private _repository: Repository<PetEntity>;

  constructor(protected repository: Repository<PetEntity>) {
    this._repository = repository;
  }

  async create(pet: PetEntity) {
    await this._repository.save(pet);
  }

  async read(): Promise<PetEntity[]> {
    return await this.repository.find();
  }

  async update(id: number, pet: PetEntity): Promise<UpdateResult> {
    try {
      const findPet = await this._repository.findOne({
        where: { id },
      });

      if (!findPet) {
        throw new Error('Pet not found');
      }

      const newPet = { ...findPet, ...pet };
      return this._repository.update(id, newPet);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      const findPet = await this._repository.findOne({
        where: { id },
      });

      if (!findPet) {
        throw new Error('Pet not found');
      }

      return this._repository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
