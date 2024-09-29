import { DataSource } from 'typeorm';
import PetEntity from '../entities/PetEntity';
import AdopterEntity from '../entities/AdopterEntity';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  entities: [PetEntity, AdopterEntity],
});
