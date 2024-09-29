import { Repository } from 'typeorm';
import PetEntity from '../entities/PetEntity';
import InterfacePetRepository from './interface/IPetRepository';

export default class PetRepository implements InterfacePetRepository {
  private _repository: Repository<PetEntity>;
  private _pets: PetEntity[] = [];

  constructor(protected repository: Repository<PetEntity>) {
    this._repository = repository;
  }

  async create(pet: PetEntity): Promise<void> {
    await this._repository.save(pet);
  }

  read(): PetEntity[] {
    return this._pets;
  }

  update(id: number, pet: PetEntity): void {
    this._pets[id] = pet;
  }

  delete(id: number): void {
    const numberOfPetsToBeDeleted = 1;

    this._pets.splice(id, numberOfPetsToBeDeleted);
  }
}
