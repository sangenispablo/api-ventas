import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';

import routes from '@shared/http/routes';
import AppError from '@shared/errors/AppError';

// llamo al metodo createConnection de typeORM para establecer la conexion
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

// rutas de los endpoints
app.use(routes);

// middleware de celebrate para la validacion de los datos
app.use(errors());

// middleware para procesar los errores de forma generica
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port: 3333');
});
