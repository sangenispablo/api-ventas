import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    // Como en la request ya viene el id por que ya esta autenticado
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }
    // veo si tengo un avatar actualmente
    if (user.avatar) {
      // si tiene un avatar anteriormente saco el nombre y path del archivo y lo borro
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExits = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExits) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    // Ahora actualizo el avatar y subo el archivo
    user.avatar = avatarFileName;
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
