import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  engineCapacity: Number,
  category: String,
}, { versionKey: false });

// https://stackoverflow.com/questions/13699784/mongoose-v-property-hide

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorcycleModel;