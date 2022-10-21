import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const motorcycle = await this._service.create(req.body);
    return res.status(201).json(motorcycle);
  }

  public async read(
    req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const updated = await this._service.update(req.params.id, req.body);

    return res.status(200).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    await this._service.delete(req.params.id);
    return res.status(204).send();
  }
}

export default MotorcycleController;
