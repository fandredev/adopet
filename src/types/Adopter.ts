import AddressEntity from '../entities/AddressEntity';
import PetEntity from '../entities/PetEntity';

export default interface Adopter {
  id: number;
  name: string;
  password: string;
  phone: string;
  photo?: string;
  address?: AddressEntity;
  pets: PetEntity[];
}

type RequestBodyAdopter = Omit<Adopter, 'id'>;
type ResponseBodyAdopter = {
  data?: Pick<Adopter, 'id' | 'name' | 'phone'>;
  error?: string;
};

export { RequestBodyAdopter, ResponseBodyAdopter };
