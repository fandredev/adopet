import { Breed } from '../types/Breed';

export function invalidBreed(petBreed: Breed): boolean {
  return Object.values(Breed).includes(petBreed);
}
