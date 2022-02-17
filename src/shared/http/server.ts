import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
// express-async-errors manda las excepciones asincronas al manejador de erroes de la clase
import 'express-async-errors';
import cors from 'cors';
// celebrate se usa para controlar los datos enviados o no al endpoint
import { errors } from 'celebrate';

import routes from './routes';
// Esta importacion ejecuta createConnection de typeorm segun el archivo ormconfig.json
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

// middleware de terceros
app.use(cors());
app.use(express.json());

// routes
app.use(routes);

// errores de celebrate
app.use(errors());

// middleware para capturar errores basados en la clase AppError o de otro tipo
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
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333 ✔');
});
