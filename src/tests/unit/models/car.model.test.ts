import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/cars.model';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ICar } from '../../../interfaces/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();
  const carArray = [carMockWithId]

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carArray);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);

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

  describe('searching all cars', () => {
    it('successfully found array of cars', async () => {
      const framesFound = await carModel.read();

      expect(framesFound).to.be.an('array');
    });

    it('The array contains a car', async () => {
      const framesFound = await carModel.read();

      framesFound?.forEach((item: ICar, index: number) => {
        expect(item).to.be.deep.equal(carArray[index]);
      });
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const frameFound = await carModel.readOne('any-id');
      expect(frameFound).to.be.deep.equal(carMockWithId);
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await carModel.readOne('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

  describe('updating a car', () => {
    it('successfully updated', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const updated = await carModel.update('any-id', carMock)
      expect(updated).to.be.deep.equal(carMockWithId)
      stub.restore();
    })

    it('throws InvalidMongoId with invalid id', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);
      let error;

      try {
        await carModel.update('invalid-id', carMock)
      } catch (err){
        error = err;
      }

      expect(error).not.to.be.undefined;
      expect((error as Error).message).to.be.equal('InvalidMongoId');
      stub.restore();
    });
  });

  describe('deleting car', () => {
    it('car deleted successfully', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(true);
      const frameDeleted = await carModel.delete('any-id');

      expect(frameDeleted).to.be.deep.equal(carMockWithId)
      stub.restore();
    });

    it('id not found', async () => {
      const stub = sinon.stub(mongoose, 'isValidObjectId').returns(false);

      try {
        await carModel.delete('invalid-id');
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }

      stub.restore();
    });
  });

});  
