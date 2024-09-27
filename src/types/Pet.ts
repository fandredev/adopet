import { Breed } from './Breed';

export type Pet = {
  id: number;
  name: string;
  dateNasc: Date;
  breed: Breed;
  adopted: boolean;
};
