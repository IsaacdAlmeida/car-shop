import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/cars.model';
import CarService from '../../../services/cars.service';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carArray = [carMockWithId]

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'delete')
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
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

  describe('Find All Cars', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'read').resolves(carArray);

      const cars = await carService.read();
      expect(cars).to.be.deep.equal(carArray);

      sinon.restore();
    });
  });

  describe('Find One Car', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);

      const carCreated = await carService.readOne(carMockWithId._id);

      expect(carCreated).to.be.deep.equal(carMockWithId);

      sinon.restore();
    });

    it('Failure', async () => {
      let error;
      sinon.stub(carModel, 'readOne').resolves(null);

      try {
        await carService.readOne(carMockWithId._id);
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);

      sinon.restore();
    });  
  });

  describe('Update Car', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'update').resolves(carMockWithId);

      const updated = await carService.update('any-id', carMock);

      expect(updated).to.be.deep.eq(carMockWithId);

      sinon.restore();
    })
    
    it('Failure - Zod', async () => {
      let error;

      try {
        await carService.update('any-id', { INVALID: "OBJECT" })
      } catch(err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError)
    })

    it('Failure - Car not Found', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let error: any;

      try {
        await carService.update('any-id', carMock)
      } catch(err) {
        error = err;
      }

      expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
    })
  });
  
  describe('Delete Car', () => {
    it('Success', async () => {
      sinon.stub(carModel, 'delete').resolves(carMockWithId);

      const frames = await carService.delete(carMockWithId._id);
      expect(frames).to.be.deep.equal(carMockWithId);

      sinon.restore();

    });
   
  });

});
