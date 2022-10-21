import { Router } from 'express';
import CarController from '../controllers/cars.controller';
import CarModel from '../models/cars.model';
import CarService from '../services/cars.service';

const carRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.post('/cars', (req, res) => carController.create(req, res));

export default carRoute;
