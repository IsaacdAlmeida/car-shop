import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
  model: 'Fox',
  year: 2021,
  color: 'cinza',
  status: true,
  buyValue: 60000,
  doorsQty: 4,
  seatsQty: 5,
}

const carMockWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Fox',
  year: 2021,
  color: 'cinza',
  status: true,
  buyValue: 60000,
  doorsQty: 4,
  seatsQty: 5,
}

export { carMock, carMockWithId };
