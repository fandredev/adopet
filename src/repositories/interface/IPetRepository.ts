import { DeleteResult, UpdateResult } from 'typeorm';
import PetEntity from '../../entities/PetEntity';
import { HeightAnimal } from '../../types/Breed';

export default interface InterfacePetRepository {
  create(pet: PetEntity): Promise<void>;
  read(): Promise<PetEntity[]> | PetEntity[];
  update(id: number, pet: PetEntity): Promise<UpdateResult>;
  delete(id: number, pet: PetEntity): Promise<DeleteResult>;

  adoptPet(petId: number, adopterId: number): Promise<PetEntity> | void;

  findPetsByHeight(height: HeightAnimal): Promise<PetEntity[]> | PetEntity[];
}
