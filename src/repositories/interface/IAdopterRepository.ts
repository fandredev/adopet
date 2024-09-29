import AdopterEntity from '../../entities/AdopterEntity';

export default interface IAdopterRepository {
  create(adopter: AdopterEntity): void;
  read(): Promise<AdopterEntity[]>;
}
