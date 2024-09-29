import AddressEntity from '../entities/AddressEntity';

export default interface Adopter {
  id: number;
  name: string;
  password: string;
  phone: string;
  photo?: string;
  address?: AddressEntity;
}
