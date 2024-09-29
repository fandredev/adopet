import PetEntity from '../../entities/PetEntity';

export default interface InterfacePetRepository {
  create(pet: PetEntity): void;
  read(): PetEntity[];
  update(id: number, pet: PetEntity): void;
  delete(id: number, pet: PetEntity): void;
}
