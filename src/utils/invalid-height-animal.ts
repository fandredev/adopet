import { HeightAnimal } from '../types/Breed';

export function invalidPetHeightAnimal(petAnimalHeight: HeightAnimal): boolean {
  return petAnimalHeight in HeightAnimal;
}
