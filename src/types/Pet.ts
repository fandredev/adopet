import AdopterEntity from '../entities/AdopterEntity';
import { Breed, HeightAnimal } from './Breed';

export type Pet = {
  id?: number;
  name: string;
  dateNasc: Date;
  breed: Breed;
  height?: HeightAnimal;
  adopted: boolean;
  adopter?: AdopterEntity;
};
