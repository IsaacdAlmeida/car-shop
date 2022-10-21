import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import MotorcycleModel from '../models/motorcycles.model';
import MotorcycleService from '../services/motorcycle.service';

const motorcycleRoute = Router();

const MOTORCYCLE_ID_ROUTE = '/motorcycles/:id';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRoute.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRoute.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcycleRoute.get(MOTORCYCLE_ID_ROUTE, (req, res) => motorcycleController.readOne(req, res));
motorcycleRoute.put(MOTORCYCLE_ID_ROUTE, (req, res) => motorcycleController.update(req, res));
motorcycleRoute.delete(MOTORCYCLE_ID_ROUTE, (req, res) => motorcycleController.delete(req, res));

export default motorcycleRoute;
