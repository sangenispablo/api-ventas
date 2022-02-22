import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    // Este Controller paso por un middleware antes que es isAuthenticated este ultimo le paso en el request el id
    // todos los controller que pasen antes por isAuthenticated reciben en el objeto request el id
    const listUser = new ListUserService();
    const users = await listUser.execute();
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(user);
  }
}
