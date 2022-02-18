import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  // en authHeaders tengo un string que tiene dos partes
  // la primera dice 'Bearer'
  // la segunda parte separada por un ' ' tiene el token, como lo obtengo al token
  // de la siguiente forma, la primera parte no la quiero por eso desestructuro asi
  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayLoad;
    // sobreescribiendo el request de express podemos agregar el id del usuario
    // para que next tenga a mano el id del mismo y saber quien es el que hacer la solicitud con solamente el token
    // este middleware le agrega ese dato al request.
    request.user = {
      id: sub,
    }
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
