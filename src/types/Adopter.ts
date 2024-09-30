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

type PickAdopterFields = Pick<Adopter, 'id' | 'name' | 'phone'>;

type RequestBodyAdopter = Omit<Adopter, 'id'>;
type RequestParamsAdopter = { id?: string };
type ResponseBodyAdopter = {
  data?: PickAdopterFields[] | PickAdopterFields;
  message?: string;
  error?: unknown;
};

export {
  PickAdopterFields,
  RequestBodyAdopter,
  RequestParamsAdopter,
  ResponseBodyAdopter,
};
