import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    // verifico si el token existe
    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    // verifico que exista el usuario del token
    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    // tomo la fecha y hora de creación
    const tokenCreatedAt = userToken.created_at;
    // le agrego dos horas y con eso valido
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    // Encripto el password que viene del formulario
    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
