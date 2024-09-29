import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../types/Pet';
import { Breed } from '../types/Breed';

@Entity() // This class is an entity to be stored in the database
export default class PetEntity implements Pet {
  @PrimaryGeneratedColumn() // Generate a unique id
  id: number;

  @Column() // Create a column in the database
  name: string;

  @Column()
  dateNasc: Date;

  @Column()
  breed: Breed;

  @Column()
  adopted: boolean;
}
