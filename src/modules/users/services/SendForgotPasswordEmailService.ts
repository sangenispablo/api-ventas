import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    // verifico que exista el usuario por ese mail
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email User does not exists.');
    }

    // Creo el token para enviar a al usuario
    await userTokenRepository.generate(user.id);
  }
}

export default SendForgotPasswordEmailService;
