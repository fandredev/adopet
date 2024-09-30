import { DeleteResult, UpdateResult } from 'typeorm';
import PetEntity from '../../entities/PetEntity';

export default interface InterfacePetRepository {
  create(pet: PetEntity): Promise<void>;
  read(): Promise<PetEntity[]> | PetEntity[];
  update(id: number, pet: PetEntity): Promise<UpdateResult>;
  delete(id: number, pet: PetEntity): Promise<DeleteResult>;

  adoptPet(petId: number, adopterId: number): Promise<PetEntity> | void;

  findPetByAnything<T extends keyof PetEntity>(
    field: T,
    value: PetEntity[T]
  ): Promise<PetEntity> | PetEntity[];
}
