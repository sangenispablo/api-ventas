import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

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
    // const decodeToken = verify(token, authConfig.jwt.secret);
    // console.log(decodeToken);
    verify(token, authConfig.jwt.secret);
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
