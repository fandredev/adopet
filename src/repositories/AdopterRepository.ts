import { Repository } from 'typeorm';
import IAdopterRepository from './interface/IAdopterRepository';
import AdopterEntity from '../entities/AdopterEntity';

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
}
