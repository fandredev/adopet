import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Adopter from '../types/Adopter';
import AddressEntity from './AddressEntity';

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

  @Column({
    nullable: true,
  })
  photo: string;

  @OneToOne(() => AddressEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn() // Field that will be used to join the tables
  address: AddressEntity;
}
