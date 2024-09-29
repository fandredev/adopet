import { DataSource } from 'typeorm';
import PetEntity from '../entities/PetEntity';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  entities: [PetEntity],
});
