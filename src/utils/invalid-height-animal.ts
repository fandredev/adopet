import { HeightAnimal } from '../types/Breed';

export function invalidPetHeightAnimal(height: HeightAnimal): boolean {
  return height in HeightAnimal;
}
