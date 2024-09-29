import { DeleteResult, UpdateResult } from 'typeorm';
import AdopterEntity from '../../entities/AdopterEntity';

export default interface IAdopterRepository {
  create(adopter: AdopterEntity): void;
  read(): Promise<AdopterEntity[]>;
  update(id: number, adopter: AdopterEntity): Promise<UpdateResult>;
  delete(id: number): Promise<DeleteResult>;
}
