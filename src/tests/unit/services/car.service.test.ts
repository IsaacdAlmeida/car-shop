import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
// import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.service';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carArray = [carMockWithId]

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    // sinon.stub(carModel, 'readOne')
    // .onCall(0).resolves(carMockWithId) 
    // .onCall(1).resolves(null);
    // sinon.stub(carModel, 'read').resolves(carArray);
    // sinon.stub(carModel, 'delete')
    // .onCall(0).resolves(carMockWithId)
    // .onCall(1).resolves(null);
  })

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;

      try {
        await carService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
