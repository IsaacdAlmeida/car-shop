import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/cars.model';
// import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
// import { ICar } from '../../../interfaces/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();
  const carArray = [carMockWithId]

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    // sinon.stub(Model, 'findOne').resolves(carMockWithId);
    // sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    // sinon.stub(Model, 'find').resolves(carArray);
    // sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);

  });

  after(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

});  
