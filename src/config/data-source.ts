import { DataSource } from 'typeorm';
import PetEntity from '../entities/PetEntity';
import AdopterEntity from '../entities/AdopterEntity';
import AddressEntity from '../entities/AddressEntity';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  entities: [PetEntity, AdopterEntity, AddressEntity],
});
