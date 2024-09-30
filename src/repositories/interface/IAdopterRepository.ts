import { DeleteResult, UpdateResult } from 'typeorm';
import AdopterEntity from '../../entities/AdopterEntity';
import AddressEntity from '../../entities/AddressEntity';

export default interface IAdopterRepository {
  create(adopter: AdopterEntity): void;
  read(): Promise<AdopterEntity[]>;
  update(id: number, adopter: AdopterEntity): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;

  updateAddressAdopter(
    idAdopter: number,
    address: AddressEntity
  ): Promise<AdopterEntity>;
}
