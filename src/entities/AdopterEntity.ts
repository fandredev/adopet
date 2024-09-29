import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Adopter from '../types/Adopter';

@Entity()
export default class AdopterEntity implements Adopter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  photo: string;

  @Column()
  address: string;
}
