import { Repository } from 'typeorm';
import IAdopterRepository from './interface/IAdopterRepository';
import AdopterEntity from '../entities/AdopterEntity';

export default class AdopterRepository implements IAdopterRepository {
  constructor(private repository: Repository<AdopterEntity>) {}

  async create(adopter: AdopterEntity): Promise<AdopterEntity> {
    return this.repository.create(adopter);
  }
}
