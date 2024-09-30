import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import PetEntity from '../entities/PetEntity';
import InterfacePetRepository from './interface/IPetRepository';
import AdopterEntity from '../entities/AdopterEntity';

export default class PetRepository implements InterfacePetRepository {
  private _petRepository: Repository<PetEntity>;
  private _adopterRepository: Repository<AdopterEntity>;

  constructor(
    protected repository: Repository<PetEntity>,
    protected adopterRepoisitory: Repository<AdopterEntity>
  ) {
    this._petRepository = repository;
    this._adopterRepository = adopterRepoisitory;
  }

  async create(pet: PetEntity) {
    await this._petRepository.save(pet);
  }

  async read(): Promise<PetEntity[]> {
    return await this._petRepository.find();
  }

  async update(id: number, pet: PetEntity): Promise<UpdateResult> {
    try {
      const findPet = await this._petRepository.findOne({
        where: { id },
      });

      if (!findPet) {
        throw new Error('Pet não encontrado.');
      }

      const newPet = { ...findPet, ...pet };
      return this._petRepository.update(id, newPet);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    try {
      const findPet = await this._petRepository.findOne({
        where: { id },
      });

      if (!findPet) {
        throw new Error('Pet não encontrado.');
      }

      return this._petRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async adoptPet(petId: number, adopterId: number) {
    try {
      const findPet = await this._petRepository.findOne({
        where: { id: petId },
      });

      if (!findPet) {
        throw new Error('Pet não encontrado.');
      }

      const findAdopter = await this._adopterRepository.findOne({
        where: { id: adopterId },
      });

      if (!findAdopter) {
        throw new Error('Adotador não encontrado.');
      }

      findPet.adopted = true;
      findPet.adopter = findAdopter;

      return this._petRepository.save(findPet);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async findPetByAnything<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T]
  ): Promise<PetEntity> {
    try {
      const pets = await this._petRepository.findOne({
        where: { [field]: value },
      });

      if (!pets) {
        throw new Error('Pet não encontrado.');
      }

      return pets;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
