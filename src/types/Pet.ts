import { Breed } from './Breed';

export type Pet = {
  id: number;
  name: string;
  age: number;
  breed: Breed;
  adopted: boolean;
};
