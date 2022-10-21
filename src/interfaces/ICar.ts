import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).int().positive()
    .gte(2, { message: 'Doors must be greater or equal than 2' })
    .lte(4, { message: 'Doors must be lesser or equal than 4' }),

  seatsQty: z.number({
    required_error: 'Seats is required',
    invalid_type_error: 'Seats must be a number',
  }).int().positive()
    .gte(2, { message: 'Seats must be greater or equal than 2' })
    .lte(7, { message: 'Seats must be lesser or equal than 7' }),
});

export type ICar = z.infer<typeof CarZodSchema>;

// https://stackoverflow.com/questions/72867815/wrap-up-zod-validations-for-reuse