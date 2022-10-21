import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

export const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),

  engineCapacity: z.number({
    required_error: 'Engine Capacity is required',
    invalid_type_error: 'Engine Capacity must be a number',
  }).int().positive()
    .lte(2500, { message: 'ngine Capacity must be lesser or equal than 1900' }),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;
