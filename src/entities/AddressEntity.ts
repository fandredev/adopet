import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Address from '../types/Address';

@Entity()
export default class AddressEntity implements Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  city: string;

  @Column()
  uf: string;

  constructor(city: string, uf: string) {
    this.city = city;
    this.uf = uf;
  }
}
